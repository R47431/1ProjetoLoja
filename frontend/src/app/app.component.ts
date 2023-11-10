import { Component } from '@angular/core';
import { Cliente } from './model/cliente';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cliente = new Cliente();

  constructor(
    private storageService: StorageService,
  ) { }

  cargo(): boolean {
    return this.storageService.cargoGerente();
  }
}
