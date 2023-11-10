import { Component, Input, OnInit } from '@angular/core';
import { Archivo } from 'src/app/Clases/Archivo';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  

  @Input() tmp:Archivo|null
  @Input() opened:{valor:boolean}
  texto:String
  @Input() editable:Boolean

  constructor(private service:EmployeeService){
    
  }

  ngOnInit(): void {
    if(this.tmp != null){
      this.texto = this.tmp.content
    }
  }

  public guardarCambios(){
    if(this.tmp != null){
      this.tmp.content =this.texto
      this.service.updatefile(this.tmp)
    }
    this.cancelar
  }

  public cancelar(){
    this.opened.valor = !this.opened.valor 
  }
}
