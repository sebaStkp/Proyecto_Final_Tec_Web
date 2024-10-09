import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bebida, Carne, Cosmetico, FrutaVerdura, Hogar, Lacteo, Panaderia, Producto, Ropa, SaludMedicamento, SnackGolosina } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { BaseDatosService } from '../../servicios/base-datos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  categorias: string[] = ['Carnes', 'Bebidas', 'Cosmeticos', 'Frutas_Verduras', 'Hogar', 'Lacteos', 'Panaderia', 'Ropa', 'Salud_Medicamentos', 'Snacks_Golosinas'];
  productoId!: number;
  productoCategoria!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private baseDatosService: BaseDatosService
  ) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id_producto: [null],
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      categoria: ['', Validators.required],
      link: ['', Validators.required],
      tipo_carne: [''],
      peso: [''],
      fecha_expiracion_lacteo: [''],
      volumen: [0],
      alcoholico: [false],
      tipo_cosmetico: [''],
      contenido: [0],
      tipo_producto: [''],
      origen: [''],
      cantidad: [0],
      fecha_elaboracion: [''],
      tipo_ropa: [''],
      talla: [''],
      dosis: [''],
      tipo_snack: [''],
      peso_lacteo: [0],
      fecha_expiracion: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    const categoria = this.route.snapshot.paramMap.get('categoria');
    console.log("id:", id," categoria:", categoria)
    if (id && categoria) {
      this.productoId = +id;
      this.productoCategoria = categoria;
      
      // Obtener y cargar el producto para edición
      this.baseDatosService.obtenerProductoPorId(this.productoId, this.productoCategoria).subscribe(
        (producto) => {
          this.productoForm.patchValue({
            id_producto: this.productoId, // Asegúrate de que id_producto esté correctamente asignado aquí
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria,
            link: producto.link,
            // Completa el resto de los campos según la categoría
          });
        },
        (error) => console.error('Error al obtener el producto:', error)
      );
  }}

  onSubmit(): void {
    const productoData = this.productoForm.value;
    let producto: Producto;

    switch (productoData.categoria) {
      case 'Carnes':
        producto = { ...productoData } as Carne;
        break;
      case 'Bebidas':
        producto = { ...productoData } as Bebida;
        break;
      case 'Cosmeticos':
        producto = { ...productoData } as Cosmetico;
        break;
      case 'Frutas_Verduras':
        producto = { ...productoData } as FrutaVerdura;
        break;
      case 'Hogar':
        producto = { ...productoData } as Hogar;
        break;
      case 'Lacteos':
        producto = { ...productoData } as Lacteo;
        break;
      case 'Panaderia':
        producto = { ...productoData } as Panaderia;
        break;
      case 'Ropa':
        producto = { ...productoData } as Ropa;
        break;
      case 'Salud_Medicamentos':
        producto = { ...productoData } as SaludMedicamento;
        break;
      case 'Snacks_Golosinas':
        producto = { ...productoData } as SnackGolosina;
        break;
      default:
        producto = { ...productoData } as Producto;
        break;
    }

    if (this.productoId) {
      // Actualizar producto existente
      console.log("entra aqui")
      console.log(producto)
      this.baseDatosService.actualizarProducto(producto).subscribe(
        (productoActualizado) => {
          console.log('Producto actualizado:', productoActualizado);
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } 
  }
}