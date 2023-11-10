import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
import { File } from 'src/app/Clases/File';
import { Folder } from 'src/app/Clases/Folder';
import { User } from 'src/app/Clases/User';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
 
  constructor(private service:EmployeeService){
  }

  opcionselected:boolean = true

  archivos:Archivo[]
  pathActual:String = '/'
  @Input() user:User
  elementoSeleccionado:Archivo|null = null
  newArchivo:Archivo = new Archivo()
  opened = {valor:true}
  moduleshared = false
  tipoArchivo:Number
  usuarioCompartido:String = ''
  archivotmp:Archivo = new Archivo()
  editable:Boolean = true


  ngOnInit(): void {
    this.loadTable();
  }

  public loadTable(){
    this.editable = true
    if(this.moduleshared != false)
    this.moduleshared = !this.moduleshared
    this.opcionselected = true
    this.service.start(this.user.username,this.pathActual).subscribe(data =>{
      this.archivos = data
    })
  }


  showoptions:boolean = false
  showcreated:boolean = false;
  showshared:boolean = false;
  showselectshare:boolean =false;

  public viewOptions(){
    this.showoptions = true;
  }

  public CreateFolder(){
    this.showcreated = true;
    this.tipoArchivo = 1

  }

  public ConfirmCreateFolder(){
      console.log('creando carpeta');
      
      this.newArchivo.path = this.pathActual
      this.newArchivo.user = this.user.username
      switch(this.tipoArchivo){
        case 1: this.newArchivo.extension = 'directorio'
        break
        case 2: this.newArchivo.extension = 'txt'
        break
        case 3: this.newArchivo.extension = 'html'
        break
      }
      if(this.tipoArchivo != 1) this.newArchivo.content = ''
      this.newArchivo.fecha = new Date()
      if(this.tipoArchivo == 1){
      this.service.CreateFolder(this.newArchivo).subscribe(
        {
          next:data=>{
            alert(data+ 'Carpeta creada correctaemente')
            this.loadTable()
          },
          error: err=>{
            alert('Ya existe una carpeta con el nombre: ' + this.newArchivo.name)
          }
        }
      )
      }else
        this.service.CreateFile(this.newArchivo).subscribe(
          {
            next:data=>{
              alert(data+ 'Archivo creado correctamente')
              this.loadTable()
            },
            error: err=>{
              alert('Ya existe un archivo con el nombre: ' + this.newArchivo.name)
            }
          }
        )
      
    
    this.showcreated = false;
  }

  public CreateFile(tipo:number){
    this.tipoArchivo = tipo
    this.showcreated = true
    
  }

  public loadshared(){
    this.editable = !this.editable
    this.moduleshared = !this.moduleshared
    this.opcionselected = false
    this.service.loadshared(this.user.username).subscribe(data=>{
      this.archivos = data
    })
  }

  toggleMenu(tmp:Archivo) {
    if (this.elementoSeleccionado === tmp) {
      this.elementoSeleccionado = null;
    } else {
      this.elementoSeleccionado = tmp;
    }
  }

  public delete(tmp:Archivo){
    
    this.service.deletefile(tmp,this.pathActual,this.editable).subscribe(data=>{
      if(this.editable)
      this.loadTable()
      else
      this.loadshared()
    })
  }

  public CreateCopy(tmp:Archivo){
    console.log(tmp);
    if(tmp.extension == 'directorio'){
      this.service.copyDirectorie(tmp).subscribe(data =>{
        this.loadTable()
      }
      )
    }else{
      this.service.copyFile(tmp).subscribe(data =>{
        this.loadTable()
      })
    }
  }


  public share(tmp:Archivo|null){
    if(tmp != null){
      console.log('compartiendo: ' + tmp.name + ' con: ' + this.usuarioCompartido);
      if(this.usuarioCompartido != this.user.username){
        this.service.shareFile(tmp,this.usuarioCompartido)
        this.showshared = false;
      }else{
        alert('no te puedes compartir un archivo a ti')
      }

    }
  }

  public open(tmp:Archivo){
    if(tmp.extension == 'directorio'){
      if(this.pathActual.length == 1)
      this.pathActual += ""+tmp.name
      else
      this.pathActual += "/"+tmp.name
      this.loadTable()
    }else{
      this.opened.valor = !this.opened.valor
    }
  }

  public move(tmp:Archivo){
      console.log('moviendo: ' + tmp.name);
      if(tmp.path != this.pathActual && this.service.cambioValido(tmp,this.pathActual))
      this.service.moveFile(tmp,this.pathActual).subscribe(data=>{
        this.loadTable()
      })
      else alert('La carpeta no se puede mover en esta direccion')
      this.showselectshare = false;
    
  }

  public back(){
    if(this.pathActual.length != 1){
      const partes = this.pathActual.split("/")
      if(partes.length != 2){
        const newpath = partes.slice(0,-1).join("/")
        this.pathActual = newpath
      }else this.pathActual = "/"
      this.loadTable()
    }
  }



  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (this.showoptions) {
      if (!(event.target as HTMLElement).closest('#buttonview') &&
          !(event.target as HTMLElement).closest('#options')) {
        this.showoptions = false;
      }
    }
  }
}
