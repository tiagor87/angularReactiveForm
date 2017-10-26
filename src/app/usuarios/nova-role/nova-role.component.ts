import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-nova-role',
  templateUrl: './nova-role.component.html',
  styleUrls: ['./nova-role.component.scss']
})
export class NovaRoleComponent implements OnInit, OnDestroy {
  @Output() adicionar = new EventEmitter<string>();
  controlRole: FormControl;
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.controlRole = this.builder.control('');
  }

  ngOnDestroy() {}

  criar() {
    this.adicionar.emit(this.controlRole.value);
    this.controlRole.reset();
  }
}
