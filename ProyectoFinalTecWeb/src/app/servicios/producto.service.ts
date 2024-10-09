import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../interfaces/product';

type Categoria = 'carnes' | 'bebidas' | 'cosmeticos' | 'frutas_verduras' | 'hogar' | 'lacteos' | 'panaderia' | 'ropa' | 'medicamentos' | 'snacks';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urls: Record<Categoria, string> = {
    carnes: 'http://localhost:3000/carnes',
    bebidas: 'http://localhost:3000/bebidas',
    cosmeticos: 'http://localhost:3000/cosmeticos',
    frutas_verduras: 'http://localhost:3000/frutas_verduras',
    hogar: 'http://localhost:3000/hogar',
    lacteos: 'http://localhost:3000/lacteos',
    panaderia: 'http://localhost:3000/panaderia',
    ropa: 'http://localhost:3000/ropa',
    medicamentos: 'http://localhost:3000/medicamentos',
    snacks: 'http://localhost:3000/snacks'
  };

  private url = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  obtenerTodosLosProductos(): Observable<Producto[]> {
    const requests = Object.values(this.urls).map(url => this.http.get<Producto[]>(url));
    return forkJoin(requests).pipe(
      map((responses: Producto[][]) => responses.flat())
    );
  }
  obtenerProductoPorId(categoria: string, id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${categoria}/${id}`);
  }

}
