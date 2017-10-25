import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { RoleComponent } from './usuarios/role/role.component';
import { UsuarioService } from './core/usuario.service';
import { NovaRoleComponent } from './usuarios/nova-role/nova-role.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    RoleComponent,
    NovaRoleComponent,
    UsuariosComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
