import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../core/usuario.service';
import { Usuario } from '../shared/usuario';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios$: Observable<Usuario[]>;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarios$ = this.usuarioService.usuarios$;
  }
}
