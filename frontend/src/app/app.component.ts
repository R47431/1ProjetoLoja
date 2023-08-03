import { Component } from '@angular/core';
import { Produto } from './model/Produto';
import { ProdutosService } from './services/produtos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  produto = new Produto();
  produtos: Produto[] = [];
  pesquisa: string = '';
  produtoEncontrado: Produto | undefined;

  constructor(private service: ProdutosService) {}

  ngOnInit(): void {
    this.lista();
  }

  lista(): void {
    this.service.listaProduto().subscribe((data) => (this.produtos = data));
  }

  cadastrar(): void {
    this.service.cadastrarProduto(this.produto).subscribe((data) => {
      this.produtos.push(data);
      this.limpaFormulario;
      alert('Cadastrar');
    });
  }

  altera(): void {
    this.service.alteraProduto(this.produto).subscribe((data) => {
      let indice = this.produtos.findIndex(
        (data) => data.id === this.produto.id
      );
      this.produtos[indice] = data;
      this.limpaFormulario;
      alert('Alterado');
    });
  }

  deleta(): void {
    this.service.deletaProduto(this.produto.id).subscribe(() => {
      let indice = this.produtos.findIndex(
        (data) => data.id === this.produto.id
      );
      this.produtos.splice(indice, 1);
      this.limpaFormulario;
      alert('Deleta');
    });
  }

  buscaProduto(): void {
    this.service.buscaProduto(this.produto.nome).subscribe((data) => {
      this.produtoEncontrado = this.produtos.find(
        (produto) =>
          produto.nome &&
          produto.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    });
  }

  limpaFormulario(): void {
    this.produto = new Produto();
  }
}
