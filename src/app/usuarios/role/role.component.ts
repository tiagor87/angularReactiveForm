import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  @Input() control: FormControl;
  @Output() deletar = new EventEmitter<void>();
  constructor(private builder: FormBuilder) {}

  static buildControl(value: string = '') {
    return new FormControl(value);
  }
}
