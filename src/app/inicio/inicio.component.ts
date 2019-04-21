import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public minDate: Date = new Date ("01/01/1975");
  public maxDate: Date = new Date ("01/01/2019");
  public value: Date = new Date ("05/16/2017");
  constructor(public router: Router) {
  
  }


  buscadorForm  = {
    tipoBusqueda : "",
    fechaDesde : "",
    fechaHasta : "",
    descripcionBusqueda: "",
  
  

  }

 

  public saveDataUsuario(form){
    console.log(form.value);
    console.log("hola");
    
  }
  
  ngOnInit() {
  }

}
