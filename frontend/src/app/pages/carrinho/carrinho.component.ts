import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { LobbyComponent } from '../lobby/lobby.component';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  produtos: Produto[] = [];
  produtosNoCarrinho: { nome: string, preco: number }[] = [];


  constructor(
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    this.produtosNoCarrinho = this.carrinhoService.getProdutosNoCarrinho();
  }

  removerDoCarrinho(produto: { nome: string, preco: number }): void {
    this.carrinhoService.removerProduto(produto);
    this.produtosNoCarrinho = this.carrinhoService.getProdutosNoCarrinho();
  }

  calcularTotal(): number {
    let total = 0;
    for (const produto of this.produtosNoCarrinho) {
      total += produto.preco;
    }
    return total;
  }
}
