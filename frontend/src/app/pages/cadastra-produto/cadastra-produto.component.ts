import { Component } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-cadastra-produto',
  templateUrl: './cadastra-produto.component.html',
  styleUrls: ['./cadastra-produto.component.css']
})
export class CadastraProdutoComponent {
  produto = new Produto();
  produtos: Produto[] = [];
  arquivoImagem: File | null = null;

  campoInvalido = {
    nome: false,
    preco: false,
    descricao: false,
    imagem: false,
  };

  constructor(private produtosServise:ProdutosService){}

  ngOnInit(): void {
      this.listaProduto();
  }

  listaProduto(): void {
    this.produtosServise.listaProduto()
    .subscribe(data => this.produtos);
  }

  cadastrarProduto(): void {
    this.produtosServise.cadastrarProduto(this.produto)
    .subscribe(data =>{
      this.produtos.push(data);
      alert('Produto cadastrado com sucesso!');
    });
  }

  alterarProduto(): void {
    this.produtosServise.alteraProduto(this.produto)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => obj.id === this.produto.id)
      this.produtos[posicao] = retorno;
      this.limpar();
      alert("Alterado")
    })
  }

  deletarProduto(): void {
    this.produtosServise.deletaProduto(this.produto.id)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => obj.id == this.produto.id);
      this.produtos.splice(posicao, 1);
      this.limpar();
      alert('removido com sucesso');
    })
  }

  selecionarArquivo(event: any): void {
    const arquivoSelecionado = event.target.files[0];
    this.arquivoImagem = arquivoSelecionado;
  }
  


  validarCampo(campo: string): void {
    if (campo === 'nome') {
      this.campoInvalido.nome = this.produto.nome === '';
    } else if (campo === 'preco') {
      const preco = Number(this.produto.preco);
      this.campoInvalido.preco = this.produto.preco === null || isNaN(preco) || preco <= 0;
    } else if (campo === 'descricao') {
      this.campoInvalido.descricao = this.produto.descricao === null;
    }
  }

  selecionarProduto(posicao: number): void {
    this.produto = this.produtos[posicao];
  }

  limpar(): void {
    this.produto = new Produto();
  }
}
