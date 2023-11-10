import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ValidacoesService } from 'src/app/services/validacoes.service';

@Component({
  selector: 'app-cadastra-cliente',
  templateUrl: './cadastra-cliente.component.html',
  styleUrls: ['../../../styles.css']
})
export class CadastraClienteComponent {
  cliente = new Cliente();
  clientes: Cliente[] = [];
  formulario: FormGroup = new FormGroup({});


  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validacoesService: ValidacoesService,

  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      idade: ['', Validators.required],
      telefone: ['', Validators.required],
      senha: ['', Validators.required]
    });
    this.listarCliente();
  }



  listarCliente(): void {
    this.clienteService.listarCliente()
      .subscribe(retorno => this.clientes = retorno)
  }


  cadastrarCliente(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
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

  limpar(): void {
    this.formulario.reset();
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
