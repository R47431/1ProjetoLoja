import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listaProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/cadastraProduto`);
  }

  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.url}/cadastraProduto`, produto)
  }

  alteraProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/cadastraProduto`, produto)
  }

  deletaProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/cadastraProduto/${id}`)
  }

  buscaProduto(nome: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/cadastraProduto/${nome}`)
  }
}
