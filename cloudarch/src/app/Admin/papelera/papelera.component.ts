import { Component } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent {
  archivos:Archivo[] = []
  elementoSeleccionado:Archivo|null = null

  constructor(private service:AdminService){}


  toggleMenu(tmp:Archivo) {
    if (this.elementoSeleccionado === tmp) {
      this.elementoSeleccionado = null;
    } else {
      this.elementoSeleccionado = tmp;
    }
  }

  public cargarPapelera(){
    this.service.getTrash().subscribe(data=>{
      this.archivos = data
    })
  }

}
