import { Component, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Producto } from '../../interfaces/product';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ProductoComponent, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  items: number = 0;
  carrito: Producto[] = [];
  appComponent: AppComponent = inject(AppComponent);
  noProductos: boolean = false;

  ngOnInit() {
    this.carrito = this.appComponent.getCarrito().map(producto => (
      { ...producto, cantidad: 1 }));
    this.items = this.carrito.length;
    console.log(this.carrito.length)
  }

  incrementarCantidad(producto: Producto) {
    producto.cantidad++;
  }

  decrementarCantidad(producto: Producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  trackById(index: number, item: Producto): number {
    return item.id_producto;
  }
  elementsCarrito():boolean {
    return this.carrito.length === 0;
  }
}
