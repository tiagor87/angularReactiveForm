import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/';
import { FormControl, FormBuilder } from '@angular/forms';
import { CadastroUsuarioService } from '../cadastro-usuario.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {
  @Input() role: string;
  controlRole: FormControl;
  subscription: Subscription;
  constructor(
    private builder: FormBuilder,
    private cadastroUsuarioService: CadastroUsuarioService
  ) {}

  ngOnInit() {
    this.controlRole = this.builder.control('');
    this.controlRole.setValue(this.role);

    this.subscription = this.controlRole.valueChanges.subscribe(role =>
      this.cadastroUsuarioService.editarRole(this.role, role)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deletar() {
    this.cadastroUsuarioService.deletarRole(this.role);
  }
}
