import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-generacion-usuario',
  templateUrl: './generacion-usuario.component.html',
  styleUrls: ['./generacion-usuario.component.css']
})
export class GeneracionUsuarioComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {
  }

  generacionUsuarioForm = {
    usuario : "",
    contrasenia : "",
    fechaInicioEnProyecto : "",
    nombreUsuario: "",
    apellidoUsuario: "",
    dni: "",
    telefono: "",
    telefonoCelular: "",
    mail:"",
    sindicatoPerteneciente:"",
    antiguedad:"",

    nombreEmpresa: "",
    cuit:"",
    actividad:"",
    direccion: "",
    localidad: "",
    codigoPostal:"",
    partido: "",
    provincia: "",

    sindicato: "",
    cct:"",
    cctNro: "",
    ramaActividad: "",
    cctNro2: "",
    ramaActividad2: "",
    cctNro3: "",
    ramaActividad3: "",
    cctNro4: "",
    ramaActividad4: ""

  }
  public saveDataUsuario(form){
    console.log(form.value);
    console.log("hola");
  }
  
}
