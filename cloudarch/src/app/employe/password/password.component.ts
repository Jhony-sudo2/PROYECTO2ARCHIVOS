import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/Clases/User';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../Admin/user/user.component.css']
})
export class PasswordComponent  {
  @Input() usuario:User
  constructor(private service:EmployeeService){}
  
  actual:String
  nueva:String
  confimarcion:String

  public changePassword(formulario:NgForm){
    console.log('actual: ' + this.usuario.password);
    if(this.actual == this.usuario.password){
      this.usuario.password = this.nueva
      this.service.changePassword(this.usuario)
    }
    else alert('La contraseña actual no es la correcta')
    formulario.reset()
  }


}
