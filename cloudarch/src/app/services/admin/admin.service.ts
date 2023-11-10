import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Archivo } from 'src/app/Clases/Archivo';
import { User } from 'src/app/Clases/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  path = 'http://localhost:8080/user/create'
  path2 = 'http://localhost:8080/folder'
  path3 = 'http://localhost:8080/file'

  public createUser(usuario:User){
    return this.http.post(this.path,usuario)
  }

  public getTrash(path2:String,tmp:Archivo|null){
    const datos = {path:path2,id:tmp?._id}
    return this.http.post<Archivo[]>(this.path2+'/papelera', datos).pipe(
      switchMap(data => {
        return this.http.post<Archivo[]>(this.path3+'/papelera', datos).pipe(
          map(data2 =>{
            return data.concat(data2)
          })
        );
      })
    );
  }


}
