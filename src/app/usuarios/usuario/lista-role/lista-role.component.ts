import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-lista-role',
  templateUrl: './lista-role.component.html',
  styleUrls: ['./lista-role.component.scss']
})
export class ListaRoleComponent implements OnInit {
  @Input() roles: FormArray;
  constructor() {}

  ngOnInit() {}

  adicionarRole(role: string) {
    this.roles.push(RoleComponent.buildControl(role));
  }

  deletarRole(indice: number) {
    this.roles.removeAt(indice);
  }
}
