import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from './Modelo/producto.modelo';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  private _http = inject(HttpClient);
  private urlBase = 'https://fakestoreapi.com/products/';

  getProducto(): Observable<IProducto[]> {
    return this._http.get<IProducto[]>(this.urlBase);
  }

  getProductoId(id: number): Observable<IProducto> {
    return this._http.get<IProducto>(`${this.urlBase}${id}`);
  }

  getProductoHombre(id: number): Observable<IProducto[]> {
    return this._http.get<IProducto[]>(`${this.urlBase}${'id<5'}`);
  }

  // getPersona(id: number): Observable<Persona> {
  //   return this.http.get<Persona>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  //  }
}
