import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwIfEmpty } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: String = "http://localhost:8080/cadastraCliente";

  constructor(private http: HttpClient) { }

  listarCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`).pipe(
      res=>res,
      error => error
    );
  }

  cadastraCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}`, cliente).pipe(
      res=>res,
      error => error
    );
  }

  alterarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}`, cliente).pipe(
      res=>res,
      error => error
    );
  }

  deletaCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      res=>res,
      error => error
    );
  }

  loginCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/validaUsuario`, cliente).pipe(
      res=>res,
      error => error
    );
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      res=>res,
      error => error
    );
  }

}
