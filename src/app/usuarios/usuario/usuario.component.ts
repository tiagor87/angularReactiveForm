import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/';
import { UsuarioService } from '../../core/usuario.service';
import { Usuario } from '../../shared/usuario';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //#region atributos
  usuario$: Observable<Usuario>;
  formUsuario: FormGroup;
  //#endregion
  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  //#region angular lifetime hooks
  ngOnInit() {
    this.configurarForms();
    this.carregarUsuario();
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
    this.formUsuario.reset();
    this.atribuirValorForm(usuario);
  }
  //#endregion

  //#region roles
  adicionarRole(role: string) {
    (<FormArray>this.formUsuario.get('roles')).controls.push(
      RoleComponent.buildControl(role)
    );
    console.log(this.formUsuario.value);
  }

  deletarRole(indice: number) {
    (<FormArray>this.formUsuario.get('roles')).controls.splice(indice, 1);
  }
  //#endregion

  //#region métodos privados
  private configurarForms() {
    this.formUsuario = this.builder.group({
      id: this.builder.control(''),
      email: this.builder.control(''),
      senha: this.builder.control(''),
      roles: this.builder.array([])
    });
  }

  private atribuirValorForm(usuario: Usuario) {
    (<FormArray>this.formUsuario.get('roles')).controls = [
      ...usuario.roles.map(() => RoleComponent.buildControl())
    ];
    this.formUsuario.setValue({
      ...usuario
    });
  }

  private carregarUsuario() {
    this.usuario$ = this.route.params.switchMap(params =>
      this.usuarioService
        .obterPorId(+params['id'])
        .do(usuario => this.atribuirValorForm(usuario))
    );
  }

  private obterValorCadastro() {
    return this.formUsuario.value;
  }
  //#endregion
}
