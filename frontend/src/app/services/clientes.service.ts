import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwIfEmpty } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: String = "http://localhost:8080/cadastraCliente";

  constructor(private http: HttpClient) { }

  listarCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`);
  }

  cadastraCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}`, cliente);
  }

  alterarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}`, cliente);
  }

  deletaCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  loginCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/validaUsuario`, cliente);
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

}
