import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/';
import { Usuario } from '../shared/usuario';

@Injectable()
export class UsuarioService {
  private static usuarios: Usuario[] = [
    {
      id: 1,
      email: 'teste@email.com',
      senha: '123456',
      roles: ['create_user', 'edit_user', 'read_user', 'delete_user']
    }
  ];
  private usuarios: BehaviorSubject<Usuario[]>;
  usuarios$: Observable<Usuario[]>;
  constructor() {
    this.usuarios = new BehaviorSubject<Usuario[]>(UsuarioService.usuarios);
    this.usuarios$ = this.usuarios.asObservable();
  }

  obterPorId(id: number): Observable<Usuario> {
    return Observable.of(UsuarioService.usuarios.find(u => u.id === id));
  }

  gravar(usuario: Usuario) {
    const id = usuario.id || UsuarioService.usuarios.length + 1;
    const i = UsuarioService.usuarios.findIndex(u => u.id === id);
    const clone = { ...usuario, roles: [...usuario.roles] };
    i < 0
      ? UsuarioService.usuarios.push(clone)
      : UsuarioService.usuarios.splice(i, 1, clone);
    return Observable.of(id).do(() =>
      this.usuarios.next(UsuarioService.usuarios)
    );
  }
}
