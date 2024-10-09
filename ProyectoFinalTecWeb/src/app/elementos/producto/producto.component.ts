import {Component, Input, inject} from '@angular/core';
import {Producto} from "../../interfaces/product";
import {Router, RouterLink} from "@angular/router";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../servicios/carrito.service';
import { BaseDatosService } from '../../servicios/base-datos.service';
import { AuthService } from '../../auth.service';


@Component({
 selector: 'app-producto',
 standalone: true,
 imports: [ RouterLink, CommonModule ],
 templateUrl: './producto.component.html',
 styleUrl: './producto.component.scss'
})
export class ProductoComponent {
 @Input() producto!: Producto;
 constructor(private route: Router,private authService: AuthService){
  
 }
 private carritoService: CarritoService = inject(CarritoService);
 private baseDatosService: BaseDatosService = inject(BaseDatosService);
 private router: Router = inject(Router);
 isAdmin(): boolean {
  return this.authService.isAdmin();
}

  aniadirAlCarrito() {
    this.carritoService.aniadirAlCarrito(this.producto);
  }

  eliminarItemCarrito() {
    this.carritoService.eliminarItemCarrito(this.producto);
  }

  isInCart(): boolean {
    return this.carritoService.isInCart(this.producto);
  }
  eliminarProducto(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.baseDatosService.eliminarProducto(this.producto.id_producto, this.producto.categoria).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
         
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
    this.route.navigate(["/tienda"]);
  }
  editarProducto(): void {
    this.router.navigate(['/editar', this.producto.id_producto, this.producto.categoria]);
  }
}

