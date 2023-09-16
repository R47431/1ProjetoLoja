import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Cargo from 'src/app/model/Cargo';
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
  clientes: Cliente[] = [];

  constructor(
    private clienteSevice: ClientesService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.clienteSevice.loginCliente(this.cliente).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigate(['/lobby']);
          this.storage.set('id', JSON.stringify(data.id));
          this.storage.set('posicao', JSON.stringify(data.cargo));
        } else {
          console.error('Resposta do servidor não contém ID de usuário');
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
}
