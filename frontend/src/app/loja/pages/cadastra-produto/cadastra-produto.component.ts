import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/loja/model/cliente';
import { Produto } from 'src/app/loja/model/produto';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-cadastra-produto',
  templateUrl: './cadastra-produto.component.html',
  styleUrls: ['./cadastra-produto.component.css']
})

export class CadastraProdutoComponent {
  cliente = new Cliente();
  produto = new Produto();
  produtos: Produto[] = [];
  arquivoImagem: File | null = null;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  campoInvalido = {
    nome: false,
    preco: false,
    descricao: false,
    imagem: false,
  };

  constructor(
    private produtosServise: ProdutosService,
  ) { }

  ngOnInit(): void {
    this.listaProduto();
  }

  listaProduto(): void {
    this.produtosServise.listaProduto()
      .subscribe(data => this.produtos = data);
  }

  cadastrarProduto(): void {
    if (this.arquivoImagem) {
      this.produtosServise.cadastrarProduto(this.produto, this.arquivoImagem)
        .subscribe((data) => {
          this.produtos.push(data);
          alert('Produto cadastrado com sucesso!');
        });
    } else {
      alert('Selecione uma imagem para o produto.');
    }
  }

  alterarProduto(): void {
    if (this.arquivoImagem) {
      this.produtosServise.alteraProduto(this.produto, this.arquivoImagem)
        .subscribe((retorno) => {
          let posicao = this.produtos.findIndex(obj => obj.produtoId === this.produto.produtoId)
          this.produtos[posicao] = retorno;
          this.limpar();
          alert("Alterado")
        });
    } else {
      alert('Selecione uma imagem para o produto.');
    }
  }

  deletarProduto(): void {
    this.produtosServise.deletaProduto(this.produto.produtoId)
      .subscribe(retorno => {
        let posicao = this.produtos.findIndex(obj => obj.produtoId == this.produto.produtoId);
        this.produtos.splice(posicao, 1);
        this.limpar();
        alert('removido com sucesso');
      })
  }

  selecionarArquivo(event: any): void {
    const arquivoSelecionado = event.target.files[0];
    this.arquivoImagem = arquivoSelecionado;
    this.produto.nomeImagem = arquivoSelecionado.name;
  }

  validarCampo(campo: string): void {
    if (campo === 'nome') {
      this.campoInvalido.nome = this.produto.nome === '';
    } else if (campo === 'preco') {
      const preco = Number(this.produto.preco);
      this.campoInvalido.preco = this.produto.preco === null || isNaN(preco) || preco <= 0;
    } else if (campo === 'descricao') {
      this.campoInvalido.descricao = this.produto.descricao === '';
    }
  }

  selecionarProduto(posicao: number): void {
    this.produto = this.produtos[posicao];
  }

  limpar(): void {
    this.produto = new Produto();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
