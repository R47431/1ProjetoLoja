import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./loja/loja.module').then((m) => m.LojaModule),
  },
  {
    path: 'cadastrar',
    loadChildren: () =>
      import('./loja/loja.module').then((m) => m.LojaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
