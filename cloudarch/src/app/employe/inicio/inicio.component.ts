import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Clases/User';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  
  usuario:User
  constructor(private cookie:CookieService){
    this.usuario = JSON.parse(this.cookie.get('Usuario'))
  }
}
