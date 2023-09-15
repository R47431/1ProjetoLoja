import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private url: string = 'http://localhost:8080/cadastraProduto';

  constructor(private http: HttpClient) { }

  listaProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}`);
  }

  cadastrarProduto(produto: Produto, imagem: File):Observable<Produto>{
    const formData = new FormData();
    formData.append('imagem', imagem);
    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco.toString());
    formData.append('descricao', produto.descricao);
  
    return this.http.post<Produto>(`${this.url}`, formData);
  }

  alteraProduto(produto: Produto, imagem: File): Observable<Produto> {
    const formData = new FormData();
    formData.append('imagem', imagem);
    formData.append('nome', produto.nome);
    formData.append('produtoId', produto.produtoId.toString());
    formData.append('preco', produto.preco.toString());
    formData.append('descricao', produto.descricao);
    return this.http.put<Produto>(`${this.url}` ,formData);  
  }

  deletaProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  buscaProduto(nome: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${nome}`)
  }
}
