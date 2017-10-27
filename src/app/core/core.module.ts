import { NgModule } from '@angular/core';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';

@NgModule({
  imports: [],
  providers: [UsuarioService, UsuarioResolver]
})
export class CoreModule {}
