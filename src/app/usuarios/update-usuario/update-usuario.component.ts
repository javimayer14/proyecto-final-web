import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InicioComponent } from '../../inicio/inicio.component'
import { AuthService } from '../../services/usuarios/auth.service';
import swal from 'sweetalert2';
import { JsonAdaptor } from '@syncfusion/ej2-data';
import { RelevamientoInicialService } from '../../services/relevamiento-inicial.service';
import { ServerUrlService } from '../../services/server-url.service'

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  data: Observable<any>;
  tipoUsuarioSelect = '';
  repiteContrasenia = '';
  role = '1';
  tipoUsuario = '';
  dataNueva: any = {};

  constructor(public datepi: DatePickerModule,private router: Router, public http: HttpClient, public authService: AuthService, private relevamiento: RelevamientoInicialService, private serverUrl: ServerUrlService) { }

  private agregarAutorizacionHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  ngOnInit() {
    data: history.state.data
    this.generacionUsuarioForm = this.serverUrl.usuarioObtenido;
    console.log("asd", this.generacionUsuarioForm);
  }

  generacionUsuarioForm = {
    username: "",
    password: "",
    fechaInicioEnProyecto: "",
    nombreUsuario: "",
    apellidoUsuario: "",

    dni: "",
    telefono: "",
    telefonoCelular: "",
    mail: "",
    sindicatoPerteneciente: "",

    antiguedad: "",
    nombreEmpresa: "",
    cuit: "",
    actividad: "",
    direccion: "",

    localidad: "",
    codigoPostal: "",
    partido: "",
    provincia: "",
    sindicato: "",

    cct: "",
    cctNro: "",
    ramaActividad: "",
    cctNro2: "",
    ramaActividad2: "",

    cctNro3: "",
    ramaActividad3: "",
    cctNro4: "",
    ramaActividad4: "",
    check: null,
    enabled: null,
    role: null

  }
  public editarDataUsuario(form) {
 
    var url = this.serverUrl.serverUrl + "/api/usuarios"
    let postData = new FormData();
    this.generacionUsuarioForm.username = form.value.usuario;
    this.generacionUsuarioForm.password = form.value.contrasenia;
    this.generacionUsuarioForm.fechaInicioEnProyecto = form.value.fechaInicioEnProyecto;
    this.generacionUsuarioForm.nombreUsuario = form.value.nombreUsuario;
    this.generacionUsuarioForm.apellidoUsuario = form.value.apellidoUsuario;

    this.generacionUsuarioForm.dni = form.value.dni;
    this.generacionUsuarioForm.telefono = form.value.telefono;
    this.generacionUsuarioForm.telefonoCelular = form.value.telefonoCelular;
    this.generacionUsuarioForm.mail = form.value.mail;
    this.generacionUsuarioForm.sindicatoPerteneciente = form.value.sindicatoPerteneciente;

    this.generacionUsuarioForm.antiguedad = form.value.antiguedad;
    this.generacionUsuarioForm.nombreEmpresa = form.value.nombreEmpresa;
    this.generacionUsuarioForm.cuit = form.value.cuit;
    this.generacionUsuarioForm.actividad = form.value.actividad;
    this.generacionUsuarioForm.direccion = form.value.direccion;

    this.generacionUsuarioForm.localidad = form.value.localidad;
    this.generacionUsuarioForm.codigoPostal = form.value.codigoPostal;
    this.generacionUsuarioForm.partido = form.value.partido;
    this.generacionUsuarioForm.provincia = form.value.provincia;
    this.generacionUsuarioForm.sindicato = form.value.sindicato;

    this.generacionUsuarioForm.cct = form.value.cct;
    this.generacionUsuarioForm.cctNro = form.value.cctNro;
    this.generacionUsuarioForm.ramaActividad = form.value.ramaActividad;
    this.generacionUsuarioForm.cctNro2 = form.value.cctNro2;
    this.generacionUsuarioForm.ramaActividad2 = form.value.ramaActividad2;

    this.generacionUsuarioForm.cctNro3 = form.value.cctNro3;
    this.generacionUsuarioForm.ramaActividad3 = form.value.ramaActividad3;
    this.generacionUsuarioForm.cctNro4 = form.value.cctNro4;
    this.generacionUsuarioForm.ramaActividad4 = form.value.ramaActividad4;
    this.generacionUsuarioForm.check = form.value.check;
    this.generacionUsuarioForm.enabled = true;
    this.generacionUsuarioForm.role = 1;

    if (this.role == 'Usuario administrador') {
      this.tipoUsuario = '2';
    } else if (this.role == 'Delegado') {
      this.tipoUsuario = '1';
      this.relevamiento.flag = 0; 

    }
     this.http
    .put(`${this.serverUrl.serverUrl + "/api/usuarios"}/${this.serverUrl.usuarioObtenido.id}`,  this.generacionUsuarioForm, {
      headers: this.agregarAutorizacionHeader(),
    })
    .subscribe(data => {

      swal.fire('Editar usuario', 'el usuario fue actualizado con exito', "success");
      console.log("FORMMM", this.generacionUsuarioForm)

      this.relevamiento.nombreUsuario = this.generacionUsuarioForm.nombreUsuario;
      this.generacionUsuarioForm.nombreUsuario
      console.log("imprimo data", this.data);
      this.router.navigate(['/usuarios']);

    }, err => {
      if (err.status == 401) {
        swal.fire('Editar usuario', 'Su sessión ha expirado', "error");
        this.authService.logOut();
        this.router.navigate(['/login']);
      }
      else if (err) {
        swal.fire('Editar usuario', 'no se pudo editar el registro', "error");
      }
    });

  }

  async obtenerId() {

    let params = new HttpParams().set("nombreUsuario", this.generacionUsuarioForm.nombreUsuario);
    return this.http.get(this.serverUrl.serverUrl + '/api/usuarios/nombreusuario', { headers: this.agregarAutorizacionHeader(), params: params }).subscribe(

      data => {
        this.dataNueva = data;
        this.serverUrl.idUsuarioGenerado = parseInt(this.dataNueva.id);
        this.relevamiento.nombreUsuario = this.dataNueva.nombreUsuario;
        console.log("busqueda usuario por id", this.dataNueva);
      });

  }

  public capturar() {
    //this.tipoUsuarioSelect = this.generacionUsuarioForm.role;
  }

}
