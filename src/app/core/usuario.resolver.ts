import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Usuario } from '../shared/usuario';
import { Observable } from 'rxjs/';
import { UsuarioService } from './usuario.service';

@Injectable()
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(private usuarioService: UsuarioService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Usuario | Observable<Usuario> {
    if (route.params['id']) {
      return this.usuarioService.obterPorId(+route.params['id']);
    }
    return {
      id: 0,
      email: '',
      senha: '',
      roles: []
    };
  }
}
