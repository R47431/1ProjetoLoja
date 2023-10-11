import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/loja/model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  cliente = new Cliente();
  clientes: Cliente[]=[];

  constructor(
    private clienteService: ClientesService,
    private storageService:StorageService 
  ){ }

  ngOnInit() {
    const id = this.storageService.get("id"); 
    this.clienteService.buscarClientePorId(id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  cargo(): boolean {
    return this.storageService.cargoGerente();
  }
}
