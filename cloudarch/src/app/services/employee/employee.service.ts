import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Archivo } from 'src/app/Clases/Archivo';
import { File } from 'src/app/Clases/File';
import { Folder } from 'src/app/Clases/Folder';
import { User } from 'src/app/Clases/User';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  path = 'http://localhost:8080/folder'
  path2 = 'http://localhost:8080/file'
  path3 = 'http://localhost:8080/user'


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

  public loadshared(user2:String){
    const usuario:string = user2.valueOf()
    const data = {user:usuario}
    const parametros = new HttpParams({fromObject:data});
    return this.http.get<Archivo[]>(this.path2+'/share',{params:parametros})
  }

  public deletefile(tmp:Archivo,pathactual:String,editable:Boolean){
    const data = {id:tmp._id,user:tmp.user,name:tmp.name,path:pathactual}
    if(tmp.extension == 'directorio'){
      return this.http.put(this.path,data)
    }else{
      console.log('eliminando archivo2');
      if(editable)
      return this.http.post(this.path2+'/delete',data) 
      else{
        const parametros = new HttpParams().set('id',tmp._id.valueOf())
        return this.http.delete(this.path2,{params:parametros})
      }
    }
  }

  public CreateFile(tmp:File){
    return this.http.post(this.path2+'/create',tmp)
  }

  public copyFile(tmp:File){
    return this.http.post(this.path2+'/copia',tmp)
  }

  public copyDirectorie(tmp:Archivo){
    return this.http.post(this.path+'/copia',tmp)
  }

  public updatefile(tmp:Archivo){

    this.http.put(this.path2+'/update',tmp).subscribe(data=>{
      console.log(data);
    })
  }

  public moveFile(tmp:Archivo,newpath2:String){
  
    const data = {archivo:tmp,newpath:newpath2}
    if(tmp.extension == 'directorio'){
      return this.http.put(this.path+'/move',data)
    }else{
      return this.http.put(this.path2+'/move',data)
    }
  }

  public cambioValido(tmp:Archivo,newpath:String):Boolean{
    let pathnulo:String 
    if(tmp.path == '/')
    pathnulo = tmp.path + ''+tmp.name
    else
    pathnulo = tmp.path + '/' + tmp.name

    if(pathnulo.length <= newpath.length){
      console.log('newpath: ' + newpath);
      const inicio=  newpath.slice(0,pathnulo.length)
      console.log(inicio + "  direcion" + pathnulo);
      if(inicio == pathnulo) return false
    }
    return true
  }

  public changePassword(user:User){
    this.http.put(this.path3,user).subscribe(data=>{console.log(data);
    })
  }


  public getFecha():String{
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleString('es-ES', { timeZoneName: 'short' });
    return fechaFormateada
  }

  public shareFile(tmp:Archivo,Usuario:String){
    const tmp2:Archivo = new Archivo()
    tmp2.name = tmp.name
    tmp2.extension = tmp.extension
    tmp2.fecha = this.getFecha()
    tmp2.content = tmp.content
    tmp2.path = tmp.path
    tmp2.user = tmp.user
    tmp2.user2 = Usuario
    this.http.post(this.path2+'/share',tmp2).subscribe({
      next:data=>{
        alert('archivo compartido correctamente')
      },
      error: err=>{
        alert(err.error.message)
      }
    })
  }
}
