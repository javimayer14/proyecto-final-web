import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public minDate: Date = new Date ("01/01/1975");
  public maxDate: Date = new Date ("01/01/2019");
  public value: Date = new Date ("05/16/2017");
  public datosBusqueda:{} = {};
  constructor(public router: Router, private http:HttpClient) {
  
  }


  buscadorForm  = {
    tipoBusqueda : "",
    fechaDesde : "",
    fechaHasta : "",
    descripcionBusqueda: "",
  
  

  }

 public buscarVariacion(form){
  console.log(form.value);
  return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

    data  => {
    this.datosBusqueda = data;
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 public buscarConflicto(form){
  console.log(form.value);
  return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

    data  => {
    this.datosBusqueda = data;
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 public buscarCambio(form){
  console.log(form.value);
  return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

    data  => {
    this.datosBusqueda = data;
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

  public saveDataUsuario(form){
    console.log(form.value);
    return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

      data  => {
      this.datosBusqueda = data;
      console.log("PUT Request is successful ", data);
      
      });

    console.log("hola");
    
  }
  
  ngOnInit() {
  }

}
