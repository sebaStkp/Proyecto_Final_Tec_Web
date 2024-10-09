import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Producto } from "../../interfaces/product";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ProductoComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  categorias = [
    { name: 'Carnes', url: 'Carnes' },
    { name: 'Bebidas', url: 'Bebidas' },
    { name: 'Cosméticos', url: 'Cosmeticos' },
    { name: 'Frutas y Verduras', url: 'Frutas_Verduras' },
    { name: 'Hogar', url: 'Hogar' },
    { name: 'Lácteos', url: 'Lacteos' },
    { name: 'Panadería', url: 'Panaderia' },
    { name: 'Ropa', url: 'Ropa' },
    { name: 'Medicamentos', url: 'Salud_Medicamentos' },
    { name: 'Snacks', url: 'Snacks_Golosinas' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onCategoryClick(url: string): void {
    this.router.navigate(['/productos', url]);
  }


}


