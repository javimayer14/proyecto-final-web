import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/usuarios/auth.service';
import { ServerUrlService } from './server-url.service';


@Injectable({
  providedIn: 'root'
})
export class RelevamientoInicialService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  data: any = [];
  nombreUsuario = "";
  idUser: number;
  dataNueva: any = {};

  constructor(public router: Router, private http: HttpClient, private authService: AuthService, private serverUrl: ServerUrlService) {

  }
  changeIdUser(id) {
    this.idUser = id;
  }

  flag: number = 0;
  private agregarAutorizacionHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }


  obtenerDetalle(){
    this.router.navigate(['/relevamientoInicial']);

  }

  obtenerRelevamiento(idUsuario) {
    let params = new HttpParams().set("idUser", idUsuario)
    return this.http
      .get(this.serverUrl.serverUrl + "/api/relevamientoInicialUsuario", {
        headers: this.agregarAutorizacionHeader(), params: params
      })
      .subscribe(data => {
        this.data = data;
        this.router.navigate(['/relevamientoInicial']);
      });
  }
}
