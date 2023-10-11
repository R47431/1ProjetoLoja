import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CadastraClienteComponent } from './pages/cadastra-cliente/cadastra-cliente.component';
import { CadastraProdutoComponent } from './pages/cadastra-produto/cadastra-produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormsModule } from '@angular/forms';

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
    CadastraClienteComponent,
    CadastraProdutoComponent,
    CarrinhoComponent,
    LobbyComponent,
    LoginComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class LojaModule { }
