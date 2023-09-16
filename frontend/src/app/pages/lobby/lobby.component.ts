import { Component } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  produto = new Produto();
  produtos: Produto[] = [];
  pesquisa: string = '';
  produtoEncontrado: Produto | undefined;

  constructor(
    private produtoService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.lista();
  }

  lista(): void {
    this.produtoService.listaProduto().subscribe((data) => (this.produtos = data));
  }

  buscaProduto(): void {
    this.produtoService.buscaProduto(this.pesquisa).subscribe((data) => {
      this.produtoEncontrado = this.produtos.find(
        (data) =>
          data.nome &&
          data.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    const produtoParaCarrinho = {
      nome: produto.nome,
      preco: parseFloat(produto.preco)
    };

    this.carrinhoService.addProduto(produtoParaCarrinho);
  }

  limpaFormulario(): void {
    this.produto = new Produto();
  }
}
