import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { CadastraClienteComponent } from './pages/cadastra-cliente/cadastra-cliente.component';
import { CadastraProdutoComponent } from './pages/cadastra-produto/cadastra-produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: 'lobby', component: LobbyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastraCliente', component: CadastraClienteComponent },
  { path: 'cadastraProduto', component: CadastraProdutoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'carrinho', component: CarrinhoComponent },


];

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class LojaModule { }
