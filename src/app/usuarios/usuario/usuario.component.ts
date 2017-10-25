import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/';
import { UsuarioService } from '../../core/usuario.service';
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario$: Observable<Usuario>;
  formUsuario: FormGroup;
  controlFiltroRoles: FormControl;
  constructor(
    private builder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.formUsuario = this.builder.group({
      email: this.builder.control(''),
      senha: this.builder.control('')
    });

    this.usuario$ = this.usuarioService.getById(1).do(usuario =>
      this.formUsuario.setValue({
        email: usuario.email,
        senha: usuario.senha
      })
    );
  }
}
