import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public minDate: Date = new Date ("01/01/1975");
  public maxDate: Date = new Date ("01/01/2019");
  public value: Date = new Date ("05/16/2017");
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  data: Observable<any>;
  constructor(public router: Router, public http: HttpClient) {
  
  }


  buscadorForm  = {
    tipoBusquedaPrincipal: "" ,
    tipoBusqueda : "",
    fechaDesde : "",
    fechaHasta : "",
    descripcionBusqueda: "",
  }

 

  public saveDataUsuario(form){
    console.log(form.value);
    console.log("hola");
    var url = "http://localhost:8080/api/buscador"
    let postData = new FormData();
    this.buscadorForm.tipoBusquedaPrincipal= "Cambio laboral";
    this.buscadorForm.tipoBusqueda = "Usuario";
    this.buscadorForm.fechaDesde = "2000-01-01";
    this.buscadorForm.fechaHasta = "2020-01-01";
    this.buscadorForm.descripcionBusqueda = form.value.fecha;
    this.data = this.http.post(url,this.buscadorForm, {headers: this.httpHeaders});
    this.data.subscribe(data =>{
      console.log(data);
    });
}
    
  }
  


