import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/usuarios/auth.service';
import { RelevamientoInicialService } from '../services/relevamiento-inicial.service';
import { ServerUrlService } from '../services/server-url.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public datosBusqueda: {} = {};
  data: any = [];
  usuarioObtenido: any = null;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public router: Router, private http: HttpClient, private authService: AuthService, private relevamiento: RelevamientoInicialService, private serverUrl: ServerUrlService) {
    this.traerUsuarios();
   }

  public traerUsuarios() {

    return this.http.get(this.serverUrl.serverUrl + '/api/usuarios', { headers: this.agregarAutorizacionHeader() }).subscribe(

      data => {
        this.datosBusqueda = data;
        this.data = data;

      });

  }
  public traerUsuarioPorId(id) {

    let params = new HttpParams().set("id", id) //Create new HttpParams
    return this.http.get(`${this.serverUrl.serverUrl + '/api/usuarios'}/${id}`, { headers: this.agregarAutorizacionHeader() }).subscribe(

      data => {
        this.usuarioObtenido = data;

      });;
  }
  public eliminarUsuario(id) {
    swal.fire({
      title: '¿Estas seguro?',
      text: "No se podrá revertir el cambio",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        let params = new HttpParams().set("id", id) //Create new HttpParams
        return this.http.delete(`${this.serverUrl.serverUrl + '/api/usuarios'}/${id}`, { headers: this.agregarAutorizacionHeader(), params: params }).subscribe(

          data => {

            swal.fire('Usuarios', '¡el usuario fue eliminado con éxito!', "success");
            this.traerUsuarios();
            swal.fire(
              'Eliminado',
              '¡se eliminó el usuario con éxito!',
              'success'
            )
          }, err => {
            if (err.status == 401) {
              swal.fire('Usuarios', 'Su sessión ha expirado', "error");
              this.authService.logOut();
              this.router.navigate(['/login']);
            }
            else if (err) {
              swal.fire('Usuarios', 'no se pudo cargar el registro', "error");
            }
          });

      }
    })



  }
  private agregarAutorizacionHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  ngOnInit() {
    this.traerUsuarios();
  }

  obtenerRelevamiento(idUsuario) {
    this.relevamiento.obtenerRelevamiento(idUsuario);
    this.relevamiento.flag = 1;
  }
}
