import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Clases/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  usuario:User = new User()
  tipo = 1

  constructor(private cookie:CookieService){
    this.usuario = JSON.parse(this.cookie.get('Usuario'))
  }

}
