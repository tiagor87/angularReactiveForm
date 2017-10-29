import { NgModule } from '@angular/core';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [],
  providers: [UsuarioService, UsuarioResolver],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule {}
