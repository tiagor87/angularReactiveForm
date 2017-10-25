import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @Input() role: string;
  controlRole: FormControl;
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.controlRole = this.builder.control('');
    this.controlRole.setValue(this.role);
  }
}
