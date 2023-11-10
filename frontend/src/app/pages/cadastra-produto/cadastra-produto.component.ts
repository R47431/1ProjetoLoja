import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Produto } from 'src/app/model/produto';
import { ProdutosService } from '../../services/produtos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacoesService } from 'src/app/services/validacoes.service';

@Component({
  selector: 'app-cadastra-produto',
  templateUrl: './cadastra-produto.component.html',
  styleUrls:['../../../styles.css']
})

export class CadastraProdutoComponent {
  produto = new Produto();
  produtos: Produto[] = [];
  formulario: FormGroup = new FormGroup({});
  arquivoImagem: File | null = null;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imagemPrevisualizada: string | null = null;


  constructor(
    private produtosServise: ProdutosService,
    private validacoesService: ValidacoesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeImagem: ['', Validators.required],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['', Validators.required],
    });
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
    if (arquivoSelecionado) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemPrevisualizada = e.target.result;
      };
      reader.readAsDataURL(arquivoSelecionado);
      this.arquivoImagem = arquivoSelecionado;
    }
  }

  selecionarProduto(posicao: number): void {
    this.produto = this.produtos[posicao];
  }

  limpar(): void {
    this.formulario.reset();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  isCampoInvalido(campo: string): boolean {
    const campoFormControl = this.formulario.get(campo) as FormControl;
    return this.validacoesService.isCampoInvalido(campoFormControl);
  }

  isCampoNumerico(campo: string): boolean {
    const campoFormControl = this.formulario.get(campo) as FormControl;
    return this.validacoesService.isCampoNumerico(campoFormControl);
  }
}