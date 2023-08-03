import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-apos-login',
  templateUrl: './apos-login.component.html',
  styleUrls: ['./apos-login.component.css']
})
export class AposLoginComponent {
  clientes:Cliente[] = [];
  cliente = new Cliente;

  constructor(private clienteService: ClientesService,
    private storage: StorageService
    ){ }

  ngOnInit(): void{
    this.lista();
  } 

  lista(): void {
    this.clienteService.listarCliente()
    .subscribe(data => {
      if(this.storage.get('cadastrado') === "true"){
        this.clientes = data;
      }else{
        alert('usuario nao cadastrado');
      }
      
    });
  }
}
