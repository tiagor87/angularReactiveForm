import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ListaRoleComponent } from './usuarios/lista-role/lista-role.component';
import { RoleComponent } from './usuarios/role/role.component';
import { UsuarioService } from './core/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ListaRoleComponent,
    RoleComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
