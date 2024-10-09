import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../elementos/producto/producto.component';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,ProductoComponent,RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  listaProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoriaActual: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService

  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        this.filtrarProductosPorCategoria(categoria);
      }
    });
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (data: Producto[]) => {
        this.listaProductos = data;
        // Filtrar los productos después de obtenerlos
        const categoria = this.route.snapshot.paramMap.get('categoria');
        if (categoria) {
          this.filtrarProductosPorCategoria(categoria);
        }
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  filtrarProductosPorCategoria(categoria: string): void {
    this.categoriaActual = categoria;
    this.productosFiltrados = this.listaProductos.filter(producto => producto.categoria === categoria);
  }

}
