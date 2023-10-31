import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employe/employee/employee.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { PasswordComponent } from './employe/password/password.component';
import { EditorComponent } from './employe/editor/editor.component';
import { UserComponent } from './Admin/user/user.component';
import { PapeleraComponent } from './Admin/papelera/papelera.component';
import { InicioComponent } from './employe/inicio/inicio.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    AdminComponent,
    PasswordComponent,
    EditorComponent,
    UserComponent,
    PapeleraComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
