import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { AppComponent } from './app.component';
import { UsuarioResolver } from './core/usuario.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: './usuarios/usuarios.module#UsuariosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
