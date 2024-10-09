import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/product';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  productoService: ProductoService= inject(ProductoService)
  listaProductos: Producto[] = [];
  constructor(private http: HttpClient) {}

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (data: Producto[]) => {
        this.listaProductos = data;
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  search(query: string): Producto[] {
    return this.listaProductos.filter(item =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    )}
}
