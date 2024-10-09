import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto, Carne, Bebida, Cosmetico, FrutaVerdura, Hogar, Lacteo, Panaderia, Ropa, SaludMedicamento, SnackGolosina } from '../../interfaces/product';
import { BaseDatosService } from '../../servicios/base-datos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class FormularioProductoComponent implements OnInit {
  productoForm!: FormGroup;
  categorias: string[] = ['Carne', 'Bebida', 'Cosmetico', 'FrutaVerdura', 'Hogar', 'Lacteo', 'Panaderia', 'Ropa', 'SaludMedicamento', 'Snacks_Golosinas'];

  constructor(private fb: FormBuilder, private baseDatosService: BaseDatosService) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id_producto: [null],
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      categoria: ['', Validators.required],
      link: ['', Validators.required],
      tipo_carne: [''],
      peso: [''],
      fecha_expiracion: [''],
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
      tipo_snack: ['']
    });
    
  }

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


  // const productoEditar = this.baseDatosService.getProductoEditar(); 
  // if (productoEditar) {
  //   this.productoForm.patchValue(productoEditar); 
  // }

    if (!producto.id_producto) {
      this.baseDatosService.agregarProducto(producto).subscribe(
        (productoAgregado) => {
          console.log('Producto agregado:', productoAgregado);
        },
        (error) => {
          console.error('Error al agregar producto:', error);
        }
      );
    } 
  }
}
