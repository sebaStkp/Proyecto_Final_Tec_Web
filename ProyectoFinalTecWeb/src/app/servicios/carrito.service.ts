import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];


  constructor() { }
  aniadirAlCarrito(producto: Producto) {
    if (!this.isInCart(producto)) {
      this.carrito.push(producto);
    }
  }

  eliminarItemCarrito(producto: Producto) {
    this.carrito = this.carrito.filter(p => p.id_producto !== producto.id_producto);
  }

  isInCart(producto: Producto): boolean {
    return this.carrito.some(p => p.id_producto === producto.id_producto);
  }

  getCarrito(): Producto[] {
    return this.carrito;
  }
  getItemsCount(): number {
    return this.carrito.length;
  }
}
