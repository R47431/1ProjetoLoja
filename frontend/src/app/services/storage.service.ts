import { Injectable } from '@angular/core';
import Cargo from '../model/Cargo';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  cliente = new Cliente();

  private stotage: Storage;

  constructor() {
    this.stotage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.stotage) {
      this.stotage.setItem(key, JSON.stringify(value));
    }
    return false;
  }

  get(key: string): any {
    if (this.stotage) {
      return JSON.parse(this.stotage.getItem(key) || 'null');
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.stotage) {
      this.stotage.removeItem(key);
    }
    return false;
  }
  clear(key: string): boolean {
    if (this.stotage) {
      this.stotage.clear();
    }
    return false;
  }

  cargoGerente(): boolean {
    const valorArmazenado = this.get("posicao");
    if (valorArmazenado != null) {
      const valorFormatado = JSON.parse(valorArmazenado);
      if (valorFormatado === Cargo.GERENTE) {
        return true;
      } else if (valorFormatado === Cargo.CLIENTE) {
        return false
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
}
