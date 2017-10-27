import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioResolver } from '../core/usuario.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: '',
        component: UsuarioComponent,
        resolve: {
          usuario: UsuarioResolver
        }
      },
      {
        path: ':id',
        component: UsuarioComponent,
        resolve: {
          usuario: UsuarioResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
