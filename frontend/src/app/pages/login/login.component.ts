import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cliente = new Cliente();
  clientes:Cliente[]=[];

  constructor(
    private clienteSevice: ClientesService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.storag();
  }

  login(): void {
    this.clienteSevice.loginCliente(this.cliente).subscribe({
      next: (data) => {
        let nome = this.cliente.nome;
        let senha = this.cliente.senha;

        if (nome && senha) {
          window.location.href = '/lobby';
        } else {
          alert('Por favor, preencha o nome e a senha corretamente.');
        }
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Nome ou Senha Incorretos');
        } else if (this.storage.get('cadastrado') === 'false') {
          alert('cliente nao cadastrado');
        } else {
          alert('Erro ao usuário. Por favor, tente novamente.');
        }
      },
    });
  }

  storag(): void {
    if (this.storage.get('cadastrado') === 'true') {
      window.location.href = '/lobby';
    }
  }
}
