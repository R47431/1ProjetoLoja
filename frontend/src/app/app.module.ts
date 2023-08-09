import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { CadastraClienteComponent } from './pages/cadastra-cliente/cadastra-cliente.component';
import { CadastraProdutoComponent } from './pages/cadastra-produto/cadastra-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    CadastraClienteComponent,
    CadastraProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
