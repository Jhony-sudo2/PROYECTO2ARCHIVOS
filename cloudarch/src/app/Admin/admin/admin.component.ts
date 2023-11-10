import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cookie:CookieService,private router:Router){
    this.usuario = JSON.parse(this.cookie.get('Usuario'))
  }

  public CerrarSesion(){
    this.cookie.delete('Usuario')
    this.router.navigate(['/'])
  }

}
