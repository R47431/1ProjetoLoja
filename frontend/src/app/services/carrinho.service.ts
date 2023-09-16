import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private produtosNoCarrinhoKey = 'produtosNoCarrinho';
  private produtosNoCarrinho: { nome: string, preco: number }[] = [];

  constructor() {
    const produtosNoCarrinhoString = localStorage.getItem(this.produtosNoCarrinhoKey);
    if (produtosNoCarrinhoString) {
      this.produtosNoCarrinho = JSON.parse(produtosNoCarrinhoString);
    }
  }

  addProduto(produto: { nome: string, preco: number }): void {
    this.produtosNoCarrinho.push(produto);
    this.atualizarLocalStorage();
  }

  removerProduto(produto: { nome: string, preco: number }): void {
    const index = this.getIndexProdutoNoCarrinho(produto);
    if (index !== -1) {
      this.produtosNoCarrinho.splice(index, 1);
      this.atualizarLocalStorage();
    }
  }

  getProdutosNoCarrinho(): { nome: string, preco: number }[] {
    return this.produtosNoCarrinho;
  }

  private atualizarLocalStorage(): void {
    localStorage.setItem(this.produtosNoCarrinhoKey, JSON.stringify(this.produtosNoCarrinho));
  }

  private getIndexProdutoNoCarrinho(produto: { nome: string, preco: number }): number {
    return this.produtosNoCarrinho.findIndex(p => p.nome === produto.nome && p.preco === produto.preco);
  }
}
