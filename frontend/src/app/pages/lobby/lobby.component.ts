import { Component } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
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

  constructor(private produtoService: ProdutosService) {}

  ngOnInit(): void {
    this.lista();
  }

  lista(): void {
    this.produtoService.listaProduto().subscribe((data) => (this.produtos = data));
  }


  buscaProduto(): void {
    this.produtoService.buscaProduto(this.produto.nome).subscribe((data) => {
      this.produtoEncontrado = this.produtos.find(
        (data) =>
          data.nome &&
          data.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    });
  }

  limpaFormulario(): void {
    this.produto = new Produto();
  }
}
