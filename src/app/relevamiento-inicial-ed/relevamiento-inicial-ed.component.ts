import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "../services/usuarios/auth.service";
import swal from "sweetalert2";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, NavigationStart } from "@angular/router";
import { RelevamientoInicialService } from '../services/relevamiento-inicial.service';
import { Location } from '@angular/common';
import { RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServerUrlService } from '../services/server-url.service';

@Component({
  selector: 'app-relevamiento-inicial-ed',
  templateUrl: './relevamiento-inicial-ed.component.html',
  styleUrls: ['./relevamiento-inicial-ed.component.css']
})
export class RelevamientoInicialEdComponent implements OnInit {
  trabajadores: any[] = [];
  data: Observable<any>;
  relevamientoForm: any = {}
  previousUrl: string;
  idUser: any;
  dataNueva: any = {};
  idFinal: number;
  flag:number = 0;

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public router: Router,
    private relevamiento: RelevamientoInicialService,
    private serverUrl: ServerUrlService


  ) {


    this.relevamientoForm = this.relevamiento.data
  }
  public agregarTrabajador() {
    this.trabajadores.push(1);
  }


  sumaTrabajadoresUOM(relevamientoUOM) {
    var cant_total_uom:number =0;
    cant_total_uom =
    relevamientoUOM.cant_directos_uom +
    relevamientoUOM.cant_subcontratados_uom +
    relevamientoUOM.cant_pasantias_becas_uom +
    relevamientoUOM.cant_monotributistas_uom +
    relevamientoUOM.cant_subvencionados_uom +
    relevamientoUOM.cant_contratos_temporarios_uom +
    relevamientoUOM.cant_terciarizados_uom +
    relevamientoUOM.cant_agencia_uom +
    relevamientoUOM.cant_personas_discapacidad_uom +
    relevamientoUOM.cant_no_registrados_uom;
    return cant_total_uom;
  }
  sumaTrabajadores(relevamiento) {
    var cant_total:number =0;

    cant_total =
      relevamiento.cant_directos +
      relevamiento.cant_subcontratados +
      relevamiento.cant_pasantias_becas +
      relevamiento.cant_monotributistas +
      relevamiento.cant_subvencionados +
      relevamiento.cant_contratos_temporarios +
      relevamiento.cant_terciarizados +
      relevamiento.cant_agencia +
      relevamiento.cant_personas_discapacidad +
      relevamiento.cant_no_registrados;
    return cant_total;
    
  }


  editData(form) {

    let usuario = this.authService.usuario;
    // this.agregarTrabajador();
    this.relevamientoForm.descripcion = form.value.descripcion;
    this.relevamientoForm.id_delegado = this.serverUrl.idUsuarioGenerado;
    let total_trabajadores = this.sumaTrabajadores(this.relevamientoForm);
    let total_trabajadores_uom = this.sumaTrabajadoresUOM(this.relevamientoForm);
    this.relevamientoForm.cant_total = total_trabajadores;
    this.relevamientoForm.cant_total_uom = total_trabajadores_uom;
    var url = this.serverUrl.serverUrl + this.serverUrl.serverUrl + "/api/relevamientoInicial/user/5";
    console.log("dddd", this.serverUrl.usuarioObtenido);
    this.data = this.http.put(url, this.relevamientoForm, { headers: this.agregarAutorizacionHeader()});
    this.data.subscribe(async data => {
      console.log("dataEditar", data);
    });
    




    this.sumaTrabajadores(this.relevamientoForm);
  
    this.router.navigate(["/usuarios"]);

  }

  editarRelevamiento(form){

  }

  ngOnInit() {
      this.relevamientoForm =this.relevamiento.data;
      console.log("relevamiento-editar", this.relevamientoForm )
  }

  private agregarAutorizacionHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }

  obtenerId() {
    this.flag= 1;

    let params = new HttpParams().set("nombreUsuario", this.relevamiento.nombreUsuario);
    return this.http.get(this.serverUrl.serverUrl + '/api/usuarios/nombreusuario', { headers: this.agregarAutorizacionHeader(), params: params }).subscribe(

      data => {

        this.dataNueva = data;
        this.relevamiento.idUser = parseInt(this.dataNueva.id)
        this.flag= 0;
      });

  }

} 