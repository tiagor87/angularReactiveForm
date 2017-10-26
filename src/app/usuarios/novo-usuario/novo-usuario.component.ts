import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/usuario.service';
import { Usuario } from '../../shared/usuario';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {
  //#region atributos
  formUsuario: FormGroup;
  //#endregion
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  //#region angular lifetime hooks
  ngOnInit() {
    this.configurarForms();
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
  }
  //#endregion

  //#region roles
  adicionarRole(role: string) {
    (<FormArray>this.formUsuario.get('roles')).controls.push(
      RoleComponent.buildControl(role)
    );
  }

  editarRole(indice: number, roleNova: string) {
    (<FormArray>this.formUsuario.get('roles')).controls[indice].setValue(
      roleNova
    );
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

  private obterValorCadastro() {
    return this.formUsuario.value;
  }
  //#endregion
}
