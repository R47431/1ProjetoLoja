import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: String = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  listarCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/cadastraCliente`);
  }

  cadastraCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/cadastraCliente`, cliente);
  }

  alterarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/cadastraCliente`, cliente);
  }

  deletaCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/cadastraCliente/${id}`);
  }
  
  loginCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/login`,cliente);
  } 

  
}
