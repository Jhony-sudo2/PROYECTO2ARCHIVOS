import { Component, Input } from '@angular/core';
import { User } from 'src/app/Clases/User';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  @Input() usuario:User

}
