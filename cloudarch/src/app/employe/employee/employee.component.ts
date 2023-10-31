import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
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


  ngOnInit(): void {
    this.loadTable();
  }

  public loadTable(){
    if(this.moduleshared != false)
    this.moduleshared = !this.moduleshared
    this.opcionselected = true
    this.service.start(this.user.username,this.pathActual).subscribe(data =>{
      this.archivos = data
    })
  }


  showoptions:boolean = false
  showcreated:boolean = false;

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
      this.service.CreateFolder(this.newArchivo).subscribe(data =>{this.loadTable()})
      }else
        this.service.CreateFile(this.newArchivo).subscribe(data=>{ this.loadTable()})
      
    
    this.showcreated = false;
  }

  public CreateFile(tipo:number){
    this.tipoArchivo = tipo
    this.showcreated = true
    
  }

  public loadshared(){
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

  public edit(tmp:Archivo){
  }

  public delete(tmp:Archivo){
    
    this.service.deletefile(tmp,this.pathActual).subscribe(data=>{
      this.loadTable()
    })
  }

  public CreateCopy(tmp:Archivo){
    let folder:Folder = new Folder()
    folder.name = tmp.name + 'copia'
    folder.path = tmp.path
    folder.extension = tmp.extension
    folder.user = tmp.user
    this.service.CreateFolder(folder).subscribe(data=>{
      this.loadTable()
    })
  }

  public share(tmp:Archivo){

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