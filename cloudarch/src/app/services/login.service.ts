import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Clases/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private htpp:HttpClient) { }
  path = 'http://localhost:8080/user'
  user:User
  
  public Login(user:User){
    return this.htpp.post<User[]>(this.path,user)
  }
}
