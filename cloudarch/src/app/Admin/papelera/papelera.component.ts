import { Component } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent {
  archivos:Archivo[] = []
  elementoSeleccionado:Archivo|null = null
  pathActual = "papelera"
  opened = {valor:true}

  constructor(private service:AdminService,private service2:EmployeeService){
    
    this.cargarPapelera(null)
  }


  toggleMenu(tmp:Archivo) {
    if (this.elementoSeleccionado === tmp) {
      this.elementoSeleccionado = null;
    } else {
      this.elementoSeleccionado = tmp;
    }
  }

  public cargarPapelera(tmp:Archivo|null){
    this.service.getTrash(this.pathActual,tmp).subscribe(data=>{
      this.archivos = data
    })
  }


  public abrir(tmp:Archivo){
    if(tmp.extension == 'directorio'){
      if(this.pathActual.length == 1)
      this.pathActual += ""+tmp.name
      else
      this.pathActual += "/"+tmp.name
      this.cargarPapelera(tmp)
    }else{
      this.opened.valor = !this.opened.valor
    }

  }

  public atras(){
    if(this.pathActual != 'papelera'){
      const partes = this.pathActual.split("/")
      if(partes.length != 2){
        const newpath = partes.slice(0,-1).join("/")
        this.pathActual = newpath
      }else this.pathActual = "papelera"
      this.cargarPapelera(null)
    }
  }

}
