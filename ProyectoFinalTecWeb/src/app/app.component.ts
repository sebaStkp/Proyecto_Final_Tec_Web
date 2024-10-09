import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from './interfaces/product';
import { ProductoService } from './servicios/producto.service';
import { ProductoComponent } from './elementos/producto/producto.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { CarritoService } from './servicios/carrito.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, ProductoComponent, CarritoComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi_tienda';
  searchControl: FormControl = new FormControl('');
  showShoppingDiv: boolean = false;

  private carritoService: CarritoService = inject(CarritoService);
  productoService: ProductoService = inject(ProductoService);

  constructor(private router: Router) {}

  toggleShoppingDiv() {
    this.showShoppingDiv = !this.showShoppingDiv;
  }

  onSearch() {
    const query = this.searchControl.value.trim(); 
    if (query) {
      this.router.navigate(['/buscar'], { queryParams: { q: query } });
    } else {
  
      this.router.navigate(['/tienda']);
    }
  }
  

  añadirAlCarrito(producto: Producto) {
    this.carritoService.aniadirAlCarrito(producto);
  }

  eliminarItemCarrito(producto: Producto) {
    this.carritoService.eliminarItemCarrito(producto);
  }

  isInCart(producto: Producto): boolean {
    return this.carritoService.isInCart(producto);
  }

  getCarrito(): Producto[] {
    return this.carritoService.getCarrito();
  }

  getItemsCount(): number {
    return this.carritoService.getItemsCount();
  }


}
