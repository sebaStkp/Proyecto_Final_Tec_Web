import { Component, OnInit, inject } from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    ProductoComponent, CommonModule
  ],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  listaDeProductos: Producto[] = [];
  productoService: ProductoService = inject(ProductoService);

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (data: Producto[]) => {
        this.listaDeProductos = data;
      },
      error => {
        console.error('Error al obtener los productos', error);
        // Manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  actualizarProductos(productosNew: Producto[]): void {
    this.listaDeProductos = productosNew;
  }

  getProductosActuales(): Producto[] {
    return this.listaDeProductos;
  }

}
