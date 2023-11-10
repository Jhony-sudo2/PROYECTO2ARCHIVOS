import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Clases/User';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  
  usuario:User = new User()
  constructor(private cookie:CookieService,private router:Router){
    this.usuario = JSON.parse(this.cookie.get('Usuario'))
  }
  tipo:Number = 1

  public cerrarSesion(){
    this.cookie.delete('Usuario')
    this.router.navigate(['/'])
  }

}
