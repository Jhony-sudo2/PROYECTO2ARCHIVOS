import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../Clases/User';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service:LoginService,private router:Router,private cookie:CookieService){

  }
  user:User = new User()
  user2:User = new User()

  public Login(){
    this.service.Login(this.user).subscribe(data =>{
      if(data.length == 0)
        alert('credenciales incorrectas')
      else{
        this.user2 = data[0]
        console.log(this.user2.lastname);
        this.cookie.set('Usuario',JSON.stringify(this.user2))
        if(this.user2.type == 'administrador') this.router.navigate(['/admin'])
        else this.router.navigate(['/empleado'])
      }
    })
  }

}
