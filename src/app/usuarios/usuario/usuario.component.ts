import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/';
import { UsuarioService } from '../../core/usuario.service';
import { Usuario } from '../../shared/usuario';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario$: Observable<Usuario>;
  formUsuario: FormGroup;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  get roles(): FormArray {
    return this.formUsuario.get('roles') as FormArray;
  }

  set roles(value: FormArray) {
    this.formUsuario.setControl('roles', value);
  }

  ngOnInit() {
    this.configurarForms();
    this.carregarUsuario();
    this.formUsuario.valueChanges.subscribe(console.log);
  }

  gravar() {
    this.usuarioService.gravar(this.formUsuario.value).subscribe(id => {
      alert('Usuário gravado com sucesso.');
      this.router.navigate(['/', id]);
    });
  }

  cancelar(usuario: Usuario) {
    this.formUsuario.reset();
    this.atribuirValorForm(usuario);
  }

  adicionarRole(role: string) {
    this.roles.push(RoleComponent.buildControl(role));
  }

  deletarRole(indice: number) {
    this.roles.removeAt(indice);
  }

  private configurarForms() {
    this.formUsuario = this.builder.group({
      id: this.builder.control(''),
      email: this.builder.control(''),
      senha: this.builder.control(''),
      roles: this.builder.array([])
    });
  }

  private atribuirValorForm(usuario: Usuario) {
    this.roles = this.builder.array(
      usuario.roles.map(RoleComponent.buildControl)
    );
    this.formUsuario.setValue(usuario);
  }

  private carregarUsuario() {
    this.usuario$ = this.route.data
      .map(data => data['usuario'])
      .do(usuario => this.atribuirValorForm(usuario));
  }
}
