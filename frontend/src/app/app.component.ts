import { Component } from '@angular/core';
import { Produto } from './model/Produto';
import { ProdutosService } from './services/produtos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  
}
