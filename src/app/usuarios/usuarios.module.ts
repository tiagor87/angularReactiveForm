import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios.component';
import { NovaRoleComponent } from './usuario/nova-role/nova-role.component';
import { RoleComponent } from './usuario/role/role.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { ListaRoleComponent } from './usuario/lista-role/lista-role.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuariosComponent,
    NovaRoleComponent,
    RoleComponent,
    ListaUsuarioComponent,
    ListaRoleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule {}
