import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastraClienteComponent } from './pages/cadastra-cliente/cadastra-cliente.component';
import { CadastraProdutoComponent } from './pages/cadastra-produto/cadastra-produto.component';

const routes: Routes = [
  { path: 'lobby', component: LobbyComponent },
  { path: '', component: LoginComponent },
  { path: 'cadastraCliente', component: CadastraClienteComponent },
  { path: 'cadastraProduto', component: CadastraProdutoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
