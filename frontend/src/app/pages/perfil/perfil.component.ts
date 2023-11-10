import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls:['../../../styles.css']
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
