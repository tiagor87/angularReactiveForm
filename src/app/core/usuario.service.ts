import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { Usuario } from '../shared/usuario';

@Injectable()
export class UsuarioService {
  constructor() {}

  getById(id: number): Observable<Usuario> {
    return Observable.of({
      id: 1,
      email: 'teste@email.com',
      senha: '123456',
      roles: ['create_user', 'edit_user', 'read_user', 'delete_user']
    });
  }
}
