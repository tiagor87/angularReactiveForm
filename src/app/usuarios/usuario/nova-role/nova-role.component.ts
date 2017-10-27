import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-nova-role',
  templateUrl: './nova-role.component.html',
  styleUrls: ['./nova-role.component.scss']
})
export class NovaRoleComponent implements OnInit {
  @Output() adicionar = new EventEmitter<string>();
  control: FormControl;
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.control = this.builder.control('');
  }

  criar() {
    this.adicionar.emit(this.control.value);
    this.control.reset();
  }
}
