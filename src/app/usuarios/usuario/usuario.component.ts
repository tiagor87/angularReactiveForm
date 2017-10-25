import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/';

import { UsuarioService } from '../../core/usuario.service';
import { Usuario } from '../../shared/usuario';
import {
  CadastroUsuarioService,
  EventoRole
} from '../cadastro-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [CadastroUsuarioService]
})
export class UsuarioComponent implements OnInit, OnDestroy {
  //#region atributos
  private roleSubscription: Subscription;

  usuario$: Observable<Usuario>;
  formUsuario: FormGroup;
  roles: Array<string>;
  //#endregion
  constructor(
    private builder: FormBuilder,
    private usuarioService: UsuarioService,
    private cadastroUsuarioService: CadastroUsuarioService
  ) {}

  //#region angular lifetime hooks
  ngOnInit() {
    this.configurarForms();
    this.carregarUsuario();
    this.configurarEventosRoles();
  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
  }
  //#endregion

  //#region usuario
  gravar() {
    const usuario = this.obterValorCadastro();
    this.usuarioService.gravar(usuario);
  }

  cancelar(usuario: Usuario) {
    this.formUsuario.reset();
    this.atribuirValorForm(usuario.email, usuario.senha, usuario.roles);
  }
  //#endregion

  //#region roles
  adicionarRole(role: string) {
    this.roles.push(role);
  }

  editarRole(indice: number, roleNova: string) {
    this.roles.splice(indice, 1, roleNova);
  }

  deletarRole(indice: number) {
    this.roles.splice(indice, 1);
  }
  //#endregion

  //#region métodos privados
  private configurarForms() {
    this.formUsuario = this.builder.group({
      email: this.builder.control(''),
      senha: this.builder.control('')
    });
  }

  private configurarEventosRoles() {
    this.roleSubscription = this.cadastroUsuarioService.role$.subscribe(
      ([evento, roleAntiga, roleNova]) =>
        this.verificarEventoEModificarRoles(evento, roleAntiga, roleNova)
    );
  }

  private verificarEventoEModificarRoles(
    evento: EventoRole,
    roleAntiga: string,
    roleNova: string
  ) {
    const i = roleAntiga ? this.roles.indexOf(roleAntiga) : -1;
    switch (evento) {
      case EventoRole.Novo:
        this.adicionarRole(roleNova);
        break;
      case EventoRole.Edicao:
        this.editarRole(i, roleNova);
        break;
      case EventoRole.Delecao:
        this.deletarRole(i);
    }
  }

  private atribuirValorForm(email: string, senha: string, roles: string[]) {
    this.formUsuario.setValue({
      email,
      senha
    });
    this.roles = roles.slice();
  }

  private carregarUsuario() {
    this.usuario$ = this.usuarioService
      .obterPorId(1)
      .do(usuario =>
        this.atribuirValorForm(usuario.email, usuario.senha, usuario.roles)
      );
  }

  private obterValorCadastro() {
    const usuario = this.formUsuario.value;
    usuario.roles = this.roles.slice();
    return usuario;
  }
  //#endregion
}
