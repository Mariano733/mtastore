import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Persona } from '../inteerface/persona';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string;
  private myApiUrl: string;
  snackBar: any;

  constructor( private http: HttpClient,  private _snackBar: MatSnackBar) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/';
  }

  getUsuarios(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addUsuario(usuario: Persona): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, usuario)
  }

  getUsuario(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUsuario(id: number, usuario: Persona): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario)
  }

  mensajeExito(mensaje: string) {
    this._snackBar.open('El usuario fue ' + mensaje + ' con exito', '', {
      duration:2000
    });
  }
}
