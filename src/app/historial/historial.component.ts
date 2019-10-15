import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { Observable } from "rxjs";
import { ExcelService } from "../services/excel.service";
import { ManejoErroresService } from "../services/manejo-errores.service";
import { throwError } from "@syncfusion/ej2-base";
import swal from "sweetalert2";
import { AuthService } from "../services/usuarios/auth.service";
import { logging } from "protractor";
import { ServerUrlService } from '../services/server-url.service';

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Component({
  selector: "app-historial",
  templateUrl: "./historial.component.html",
  styleUrls: ["./historial.component.css"]
})
export class HistorialComponent implements OnInit {
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  datosBusqueda = {};
  buscar: string = "";
  dataExel: any = [];
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private urlServer: ServerUrlService) { }

  ngOnInit() { }

  public prueba() {
    return this.http
      .get(this.urlServer.serverUrl + "/usuarios/historial", {
        headers: this.agregarAutorizacionHeader()
      })
      .subscribe(data => {
      }, err => {
        if (err.status == 401) {
          swal.fire('Historial', 'Su sessión ha expirado', "error");
          this.authService.logOut();
          this.router.navigate(['/login']);
        }
        else if (err) {
          swal.fire('Historial', 'no se pudo cargar el registro', "error");
        }
      });
  }

  eliminarRegistro(

    tipo: string,
    idUsuario: string,
    fecha: string,
    desc: string
  ) {

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
        let params = new HttpParams()
          .set("tipo", tipo)
          .set("idUsuario", idUsuario)
          .set("fecha", fecha)
          .set("desc", desc); //Create new HttpParams

        return this.http
          .get(this.urlServer.serverUrl + "/api/usuarios/historial/delete", {
            headers: this.agregarAutorizacionHeader(),
            params: params
          })
          .subscribe(data => {

            this.buscarHistorial();
            swal.fire(
              'Eliminado',
              '¡se eliminó el registro con éxito!',
              'success'
            )
          }, err => {
            if (err.status == 401) {
              swal.fire('Historial', 'Su sessión ha expirado', "error");
              this.authService.logOut();
              this.router.navigate(['/login']);
            }
            else if (err) {
              swal.fire('Historial', 'no se pudo cargar el registro', "error");
            }
          });

      }
    })



  }

  private agregarAutorizacionHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }
  buscarHistorial() {
    if (this.buscar.length == 0) {
      return;
    } else {
      let params = new HttpParams().set("nombreUsuario", this.buscar); //Create new HttpParams

      return this.http
        .get(this.urlServer.serverUrl + "/api/usuarios/historial", {
          headers: this.agregarAutorizacionHeader(),
          params: params
        })
        .subscribe(data => {
          this.datosBusqueda = data;
          this.dataExel = data;
        }, err => {
          if (err.status == 401) {
            swal.fire('Historial', 'Su sessión ha expirado', "error");
            this.authService.logOut();
            this.router.navigate(['/login']);
          }
          else if (err) {
            swal.fire('Historial', 'no se pudo cargar el registro', "error");
          }
        });
    }
  }

  generar() {
    let dataJson: any[] = [];

    for (var x in this.dataExel) {
      dataJson.push({
        Tipo_registro: this.dataExel[x][0],
        Motivo: this.dataExel[x][1],
        Tipo_contrato: this.dataExel[x][3],
        Inc_reinc: this.dataExel[x][4],
        Tipo_variacion: this.dataExel[x][5],
        Medida: this.dataExel[x][8],
        Descripcíon: this.dataExel[x][6],
        Fecha: this.dataExel[x][9]
      });
    }
    this.exportAsExcelFile(dataJson, "ejemplo");
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
