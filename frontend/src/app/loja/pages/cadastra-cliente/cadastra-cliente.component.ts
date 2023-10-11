import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/loja/model/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-cadastra-cliente',
  templateUrl: './cadastra-cliente.component.html',
  styleUrls: ['./cadastra-cliente.component.css']
})
export class CadastraClienteComponent {
  cliente = new Cliente();

  clientes: Cliente[] = [];

  campoInvalido = {
    nome: false,
    idade: false,
    telefone: false,
    senha: false,
  };

  constructor(
    private clienteService: ClientesService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.listarCliente();
  }

  listarCliente(): void {
    this.clienteService.listarCliente()
      .subscribe(retorno => this.clientes = retorno)
  }


  cadastrarCliente(): void {
    this.clienteService.cadastraCliente(this.cliente).subscribe({
      next: (data) => {
        this.clientes.push(data);
        alert('Usuário cadastrado com sucesso!');
      },
      error: (error) => {
        let senha = this.cliente.senha;

        if (senha === "") {
          alert('Por favor, preencha o campo de senha.');
        } else if (!/^\d+$/.test(senha)) {
          alert('A senha não pode ser alfabética.');
        } else if (error.status === 400) {
          alert('Nome de usuário já está em uso');
        } else {
          alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
        }
      },
      complete: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  validarCampo(campo: string): void {
    if (campo === 'nome') {
      this.campoInvalido.nome = this.cliente.nome === '';
    } else if (campo === 'idade') {
      const idade = Number(this.cliente.idade);
      this.campoInvalido.idade = this.cliente.idade === null || isNaN(idade) || idade <= 0;
    } else if (campo === 'telefone') {
      this.campoInvalido.telefone = this.cliente.telefone === null || this.cliente.telefone.length !== 9;
    } else if (campo === 'senha') {
      const senha = Number(this.cliente.senha);
      this.campoInvalido.senha = this.cliente.senha === null || isNaN(senha) || this.cliente.senha == '';
    }
  }

  limpar(): void {
    this.cliente = new Cliente();
  }

}
