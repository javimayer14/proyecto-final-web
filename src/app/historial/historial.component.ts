import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {map, catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Observable } from 'rxjs';
import { ExcelService  } from '../services/excel.service';
import { ManejoErroresService } from '../services/manejo-errores.service';
import { throwError } from '@syncfusion/ej2-base';
import swal from 'sweetalert2';
import { AuthService } from '../services/usuarios/auth.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  datosBusqueda = {}
  buscar:string = "";
  constructor( private http:HttpClient, private authService:AuthService) { 

  }

  ngOnInit() {

  

  }

  public prueba (){
  
    
    return this.http.get('http://localhost:8080/api/usuarios/historial', {headers: this.agregarAutorizacionHeader()}).subscribe(
  
      data  => {
      console.log("PUT Request is successful ", data);
      
      });
  }

  private agregarAutorizacionHeader(){
    let token = this.authService.token;
    if(token != null){
        return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }
  buscarHistorial(){
    if(this.buscar.length == 0){
      return;
    }
    else{
      let params = new HttpParams().set("nombreUsuario",this.buscar); //Create new HttpParams
      console.log("ESTOS SON LOS PARAMETROS " + params);
  
      return this.http.get('http://localhost:8080/api/usuarios/historial', {headers: this.agregarAutorizacionHeader(),params: params}).subscribe(

      data  => {
      this.datosBusqueda = data;
      console.log("PUT Request is successful ", this.datosBusqueda);    
      });

    }
  }
}
