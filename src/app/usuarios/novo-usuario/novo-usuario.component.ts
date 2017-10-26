import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/usuario.service';
import {
  CadastroUsuarioService,
  EventoRole
} from '../cadastro-usuario.service';
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss'],
  providers: [CadastroUsuarioService]
})
export class NovoUsuarioComponent implements OnInit, OnDestroy {
  //#region atributos
  private roleSubscription: Subscription;

  usuario$: Observable<Usuario>;
  formUsuario: FormGroup;
  roles: Array<string>;
  //#endregion
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private cadastroUsuarioService: CadastroUsuarioService
  ) {}

  //#region angular lifetime hooks
  ngOnInit() {
    this.configurarForms();
    this.configurarEventosRoles();
  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
  }
  //#endregion

  //#region usuario
  gravar() {
    const usuario = this.obterValorCadastro();
    this.usuarioService.gravar(usuario).subscribe(id => {
      alert('Usuário gravado com sucesso.');
      this.router.navigate(['/', id]);
    });
  }

  cancelar(usuario: Usuario) {
    this.router.navigate(['/']);
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
      id: this.builder.control(''),
      email: this.builder.control(''),
      senha: this.builder.control('')
    });
    this.roles = [];
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

  private obterValorCadastro() {
    const usuario = this.formUsuario.value;
    usuario.roles = this.roles.slice();
    return usuario;
  }
  //#endregion
}
