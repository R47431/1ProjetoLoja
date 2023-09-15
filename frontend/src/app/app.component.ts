import { Component } from '@angular/core';
import { Produto } from './model/Produto';
import { ProdutosService } from './services/produtos.service';
import { StorageService } from './services/storage.service';
import { Cliente } from 'src/app/model/Cliente';
import Cargo from './model/Cargo';
import cargo from 'src/app/model/Cargo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  cliente = new Cliente();

  constructor(
    private storageService: StorageService
  ) { }

  cargo(): boolean {
    return this.storageService.cargoGerente();
  }
}
