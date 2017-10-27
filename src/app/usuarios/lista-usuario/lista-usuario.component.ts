import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {
  @Input() usuarios: Usuario[];
  constructor() {}

  ngOnInit() {}
}
