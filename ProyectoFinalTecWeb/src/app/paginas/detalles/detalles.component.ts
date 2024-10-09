import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Producto, Carne, Bebida, Cosmetico, FrutaVerdura, Hogar, Lacteo, Panaderia, Ropa, SaludMedicamento, SnackGolosina } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../../elementos/producto/producto.component';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  productoService: ProductoService = inject(ProductoService);
  detalleProducto: Producto | undefined;
  listaProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productoFiltradoPorId: Producto | undefined;
  appComponent: AppComponent = inject(AppComponent);

  constructor() {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  aniadirAlCarrito() {
    if (!this.appComponent.isInCart(this.detalleProducto!)) {
      this.appComponent.añadirAlCarrito(this.detalleProducto!);
    }
  }

  eliminarItemCarrito() {
    if (this.appComponent.isInCart(this.detalleProducto!)) {
      this.appComponent.eliminarItemCarrito(this.detalleProducto!);
    }
  }

  isInCart(): boolean {
    return this.appComponent.isInCart(this.detalleProducto!);
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (data: Producto[]) => {
        this.listaProductos = data;
        const categoria = this.route.snapshot.paramMap.get('categoria');
        const idProducto = Number(this.route.snapshot.paramMap.get('id'));
        if (categoria && idProducto) {
          this.filtrarProductoPorCategoriaEId(categoria, idProducto);
        }
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  filtrarProductoPorCategoriaEId(categoria: string, id: number): void {
    this.productosFiltrados = this.listaProductos.filter(producto => producto.categoria === categoria);
    this.detalleProducto = this.productosFiltrados.find(producto => producto.id_producto === id);
  }

  esCarne(producto: Producto): producto is Carne {
    return producto.categoria === 'Carnes';
  }

  esBebida(producto: Producto): producto is Bebida {
    return producto.categoria === 'Bebidas';
  }

  esCosmetico(producto: Producto): producto is Cosmetico {
    return producto.categoria === 'Cosmeticos';
  }

  esFrutaVerdura(producto: Producto): producto is FrutaVerdura {
    return producto.categoria === 'Frutas_Verduras';
  }

  esHogar(producto: Producto): producto is Hogar {
    return producto.categoria === 'Hogar';
  }

  esLacteo(producto: Producto): producto is Lacteo {
    return producto.categoria === 'Lacteos';
  }

  esPanaderia(producto: Producto): producto is Panaderia {
    return producto.categoria === 'Panaderia';
  }

  esRopa(producto: Producto): producto is Ropa {
    return producto.categoria === 'Ropa';
  }

  esSaludMedicamento(producto: Producto): producto is SaludMedicamento {
    return producto.categoria === 'Salud_Medicamento';
  }

  esSnackGolosina(producto: Producto): producto is SnackGolosina {
    return producto.categoria === 'Snacks_Golosinas';
  }
}
