import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
import { User } from 'src/app/Clases/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  path = 'http://localhost:8080/user/create'
  path2 = 'http://localhost:8080/user/create2'

  public createUser(usuario:User){
    return this.http.post(this.path,usuario)
  }

  public getTrash(){
    return this.http.get<Archivo[]>(this.path2)
  }

}
