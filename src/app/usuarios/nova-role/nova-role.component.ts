import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/';
import { CadastroUsuarioService } from '../cadastro-usuario.service';

@Component({
  selector: 'app-nova-role',
  templateUrl: './nova-role.component.html',
  styleUrls: ['./nova-role.component.scss']
})
export class NovaRoleComponent implements OnInit, OnDestroy {
  controlRole: FormControl;
  subscription: Subscription;
  constructor(
    private builder: FormBuilder,
    private cadastroUsuarioService: CadastroUsuarioService
  ) {}

  ngOnInit() {
    this.controlRole = this.builder.control('');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  criar() {
    this.cadastroUsuarioService.criarRole(this.controlRole.value);
    this.controlRole.reset();
  }
}
