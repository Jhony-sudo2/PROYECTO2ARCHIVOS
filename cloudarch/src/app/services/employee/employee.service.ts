import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Archivo } from 'src/app/Clases/Archivo';
import { File } from 'src/app/Clases/File';
import { Folder } from 'src/app/Clases/Folder';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  path = 'http://localhost:8080/folder'
  path2 = 'http://localhost:8080/file'


  public start(usuario: String,path2:String){
    const datos = { user: usuario,path:path2};
    return this.http.post<Archivo[]>(this.path, datos).pipe(
      switchMap(data => {
        return this.http.post<Archivo[]>(this.path2, datos).pipe(
          map(data2 =>{
            return data.concat(data2)
          })
        );
      })
    );
  }
  public CreateFolder(newFolder:Folder){
    return this.http.post(this.path+'/create',newFolder)
  }

  public loadshared(user:String){
    const data = {user:user}
    return this.http.post<Archivo[]>(this.path+'/shared',data)
  }
  public deletefile(tmp:Archivo,pathactual:String){
    const data = {user:tmp.user,name:tmp.name,path:pathactual}
    if(tmp.extension == 'directorio'){
      return this.http.put(this.path,data)
    }else{
      console.log('eliminando archivo2');
      return this.http.post(this.path2+'/delete',data) 
    }
  }

  public CreateFile(tmp:File){
    return this.http.post(this.path2+'/create',tmp)
  }

  public updatefile(tmp:Archivo){

    this.http.put(this.path2+'/update',tmp).subscribe(data=>{
      console.log(data);
    })
  }

}
