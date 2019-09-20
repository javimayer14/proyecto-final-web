import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { GeneracionUsuarioComponent } from './generacion-usuario/generacion-usuario.component';
import { RelevamientoInicialComponent } from './relevamiento-inicial/relevamiento-inicial.component';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BuscadorComponent } from './buscador/buscador.component';
import { GenerarExelComponent } from './generar-exel/generar-exel.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HistorialComponent } from './historial/historial.component';
import { RelevamientoInicialService } from './services/relevamiento-inicial.service';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GeneracionUsuarioComponent,
    RelevamientoInicialComponent,
    BuscadorComponent,
    GenerarExelComponent,
    LoginComponent,
    UsuariosComponent,
    HistorialComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DatePickerModule
    
  ],
  providers: [
    RelevamientoInicialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
