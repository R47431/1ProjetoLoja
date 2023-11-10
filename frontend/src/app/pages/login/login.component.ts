import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidacoesService } from '../../services/validacoes.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['../../../styles.css']
})
export class LoginComponent {
  cliente = new Cliente();
  clientes: Cliente[] = [];
  formulario:FormGroup = new FormGroup({});

  constructor(
    private clienteSevice: ClientesService,
    private storage: StorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validacoesService:ValidacoesService,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    })

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


  isCampoInvalido(campo: string): boolean {
    const campoFormControl = this.formulario.get(campo) as FormControl;
    return this.validacoesService.isCampoInvalido(campoFormControl);
  }
  isCampoNumerico(campo: string): boolean {
    const campoFormControl = this.formulario.get(campo) as FormControl;
    return this.validacoesService.isCampoNumerico(campoFormControl);
  }
}
