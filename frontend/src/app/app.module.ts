import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastraClienteComponent } from './pages/cadastra-cliente/cadastra-cliente.component';
import { CadastraProdutoComponent } from './pages/cadastra-produto/cadastra-produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastraClienteComponent,
    CadastraProdutoComponent,
    CarrinhoComponent,
    LobbyComponent,
    LoginComponent,
    PerfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
