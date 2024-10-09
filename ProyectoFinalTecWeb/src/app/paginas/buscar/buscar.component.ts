import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Producto } from '../../interfaces/product';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ProductoComponent],
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})


export class BuscarComponent implements OnInit {
  query: string = '';
  results: Producto[] = [];
  listaProductos: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}



  ngOnInit() {
    this.obtenerProductos();
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.search(this.query);
    });
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (data: Producto[]) => {
        this.listaProductos = data;
        console.log(this.listaProductos)
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  search(query: string) {
    this.results =this.listaProductos.filter(item =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    )}
  }
