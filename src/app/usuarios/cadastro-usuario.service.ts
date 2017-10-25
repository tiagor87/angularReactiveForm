import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/';

export enum EventoRole {
  Novo,
  Edicao,
  Delecao
}

@Injectable()
export class CadastroUsuarioService {
  private role: Subject<[EventoRole, string, string]>;
  role$: Observable<[EventoRole, string, string]>;
  constructor() {
    this.role = new Subject<[EventoRole, string, string]>();
    this.role$ = this.role.asObservable();
  }

  criarRole(role: string) {
    this.role.next([EventoRole.Novo, null, role]);
  }

  editarRole(roleAntiga: string, role: string) {
    this.role.next([EventoRole.Edicao, roleAntiga, role]);
  }

  deletarRole(role: string) {
    this.role.next([EventoRole.Delecao, role, null]);
  }
}
