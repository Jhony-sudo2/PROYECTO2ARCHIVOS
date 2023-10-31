import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Clases/User';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuario:User = new User()
  usuarioactual:User = new User()
  passconfirmate:String

  constructor(private service:AdminService){}
  ngOnInit(): void {

  }

  public createUser(){
    this.service.createUser(this.usuario).subscribe(
      {
        next:data=>{
          alert(data+ 'usuario creado correctaemente')
          this.ngOnInit()
        },
        error: err=>{
          alert('el usuario ya existe')
        }
      }
    )
  }

}
