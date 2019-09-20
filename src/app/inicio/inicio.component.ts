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
import { ServerUrlService } from '../services/server-url.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  public minDate: Date = new Date ("01/01/1975");
  public maxDate: Date = new Date ();
  public value: Date = new Date ("05/16/2017");
  public datosBusqueda:{} = {};
  public x = "";
  name = 'Angular 6';
  data: any = [];
  parametros: any = [];
  muestras:any= [];
  private urlEndPoint: String = 'http://localhost:8080/api/variaciones/busqueda';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    
  constructor(public router: Router, private http:HttpClient, private errores:ManejoErroresService, private authService:AuthService, private serverUrl:ServerUrlService) {
  
  }

  private agregarAutorizacionHeader(){
      let token = this.authService.token;
      if(token != null){
          return this.httpHeaders.append('Authorization','Bearer ' + token);
      }
      return this.httpHeaders;
  }
  generarCamb(){
    let dataJson:any[] =[];
   
    for(var x in this.data){
      console.log("ACA ARRANCA");
      console.log(this.data[x]);
      dataJson.push({
        Nombre:this.data[x][0],
        Apellido:this.data[x][1],
        Nombre_empresa:this.data[x][2],
        Fecha_carga:this.data[x][4],
        Cambio:this.data[x][5],
        Descripcíon:this.data[x][6]
      });
    }
    this.exportAsExcelFile(dataJson,'ejemplo');
  }

  generarConf(){
    let dataJson:any[] =[];
   
    for(var x in this.data){
      console.log("ACA ARRANCA");
      console.log(this.data[x]);
      dataJson.push({
        Nombre:this.data[x][0],
        Apellido:this.data[x][1],
        Nombre_empresa:this.data[x][2],
        Fecha_carga:this.data[x][3],
        Medida:this.data[x][6],
        Descripcíon:this.data[x][5]
      });
    }
    this.exportAsExcelFile(dataJson,'ejemplo');
  }

  generarVar(){
    let dataJson:any[] =[];
   
    for(var x in this.data){
      console.log("ACA ARRANCA");
      console.log(this.data[x]);
      dataJson.push({
        Nombre:this.data[x][0],
        Apellido:this.data[x][1],
        Nombre_empresa:this.data[x][3],
        Fecha_carga:this.data[x][4],
        tipo_variacion:this.data[x][5],
        numero_trabajadores:this.data[x][8],
        inc_reinc:this.data[x][6],
        Descripcion:this.data[x][7]
      });
    }
    this.exportAsExcelFile(dataJson,'ejemplo');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    json.forEach
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  buscadorForm  = {
    tipoBusquedaPrincipal: "" ,
    tipoBusqueda : "",
    fechaDesde :  null,
    fechaHasta : null,
    descripcionBusqueda: "",
    tipoVariacion: ""
  }
public validacionParametros(form){
    if (form.tipoBusqueda  == null || form.fechaDesde == null || form.fechaHasta  == null){
      swal.fire('Datos incompletos','debe completar todos los campos',"info" );
    }
}
 public buscarVariacion(form){
  this.validacionParametros(this.buscadorForm);
  //FECHA DESDE CON FORMATO CORRECTO
  var mesDesde = '' + (this.buscadorForm.fechaDesde.getMonth() + 1);
  var diaDesde = '' + this.buscadorForm.fechaDesde.getDate();
  var anioDesde = this.buscadorForm.fechaDesde.getFullYear();
  if (mesDesde.length < 2) mesDesde = '0' + mesDesde;
  if (diaDesde.length < 2) diaDesde = '0' + diaDesde;
  var fechaFormatoCorrectoDesde =  [anioDesde, mesDesde, diaDesde].join('-');
  fechaFormatoCorrectoDesde.toString();
  console.log(fechaFormatoCorrectoDesde);
   //FECHA HASTA CON FORMATO CORRECTO
   var mesHasta = '' + (this.buscadorForm.fechaHasta.getMonth() + 1);
   var diaHasta = '' + this.buscadorForm.fechaHasta.getDate();
   var anioHasta = this.buscadorForm.fechaHasta.getFullYear();
   if (mesHasta.length < 2) mesHasta = '0' + mesHasta;
   if (diaHasta.length < 2) diaHasta = '0' + diaHasta;
   var fechaFormatoCorrectoHasta =  [anioHasta, mesHasta, diaHasta].join('-');
   fechaFormatoCorrectoHasta.toString();
   this.x = fechaFormatoCorrectoHasta;
   console.log(fechaFormatoCorrectoHasta);

  console.log(form.value);
  
  let params = new HttpParams().set("tipoBusqueda",this.buscadorForm.tipoBusqueda).set("descripcionBusqueda", this.buscadorForm.descripcionBusqueda).set("fechaDesde", fechaFormatoCorrectoDesde.toString()).set("fechaHasta", fechaFormatoCorrectoHasta.toString()).set("tipoVariacion",this.buscadorForm.tipoVariacion); //Create new HttpParams
  console.log("ESTOS SON LOS PARAMETROS " + params);
  
  return this.http.get(this.serverUrl.serverUrl + '/api/variaciones/busqueda', {headers: this.agregarAutorizacionHeader(),params: params}).subscribe(

    data  => {
    this.datosBusqueda = data;
    this.data =data;
    swal.fire('Variaciones','los datos fueron recuperados con éxito',"success" );
    console.log(fechaFormatoCorrectoHasta);
    console.log("PUT Request is successful ", this.datosBusqueda);
    
    });

  console.log("hola");
 
 
 }

 public buscarConflicto(form){
  this.validacionParametros(this.buscadorForm);
  this.muestras = [
    ['Juan','Lopez','cualquier campo','Fusap','2019-01-01','Jornada de trabajo','Reduccion de horas','se redujeron 2hs semanales'],
    ['Maria','Perez','cualquier campo','Mercel S.A','2017-08-01','salud y seguridad','Accidente de trabajo','caida por piso mojado'],
    ['Norma','Maldonado','cualquier campo','Pablo S.A','2018-09-11','Logros y beneficios','Comedor','apertura de nuevo comedor'],
    ['Juan','Lopez','cualquier campo','Fusap','2019-01-01','Jornada de trabajo','Reduccion de horas','se redujeron 2hs semanales'],
    ['Maria','Perez','cualquier campo','Mercel S.A','2017-08-01','salud y seguridad','Accidente de trabajo','caida por piso mojado'],
    ['Norma','Maldonado','cualquier campo','Pablo S.A','2018-09-11','Logros y beneficios','Comedor','apertura de nuevo comedor'],
    ['Juan','Lopez','cualquier campo','Fusap','2019-01-01','Jornada de trabajo','Reduccion de horas','se redujeron 2hs semanales'],
    ['Maria','Perez','cualquier campo','Mercel S.A','2017-08-01','salud y seguridad','Accidente de trabajo','caida por piso mojado']
    ];
  //FECHA DESDE CON FORMATO CORRECTO
  var mesDesde = '' + (this.buscadorForm.fechaDesde.getMonth() + 1);
  var diaDesde = '' + this.buscadorForm.fechaDesde.getDate();
  var anioDesde = this.buscadorForm.fechaDesde.getFullYear();
  if (mesDesde.length < 2) mesDesde = '0' + mesDesde;
  if (diaDesde.length < 2) diaDesde = '0' + diaDesde;
  var fechaFormatoCorrectoDesde =  [anioDesde, mesDesde, diaDesde].join('-');
  fechaFormatoCorrectoDesde.toString();
  console.log(fechaFormatoCorrectoDesde);
   //FECHA HASTA CON FORMATO CORRECTO
   var mesHasta = '' + (this.buscadorForm.fechaHasta.getMonth() + 1);
   var diaHasta = '' + this.buscadorForm.fechaHasta.getDate();
   var anioHasta = this.buscadorForm.fechaHasta.getFullYear();
   if (mesHasta.length < 2) mesHasta = '0' + mesHasta;
   if (diaHasta.length < 2) diaHasta = '0' + diaHasta;
   var fechaFormatoCorrectoHasta =  [anioHasta, mesHasta, diaHasta].join('-');
   fechaFormatoCorrectoHasta.toString();
   this.x = fechaFormatoCorrectoHasta;
   console.log(fechaFormatoCorrectoHasta);
  
   
  console.log(form.value);
  
  let params = new HttpParams().set("tipoBusqueda",this.buscadorForm.tipoBusqueda).set("descripcionBusqueda", this.buscadorForm.descripcionBusqueda).set("fechaDesde", fechaFormatoCorrectoDesde.toString()).set("fechaHasta", fechaFormatoCorrectoHasta.toString()); //Create new HttpParams
  console.log("ESTOS SON LOS PARAMETROS " + params); 
  return this.http.get(this.serverUrl.serverUrl + '/api/conflictosLaborales/busqueda', {headers: this.agregarAutorizacionHeader(),params: params}).subscribe(

    data  => {
    this.data = data;
    swal.fire('Conflictos','los datos fueron recuperados con éxito',"success" );

    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 public buscarCambio(form){
  this.validacionParametros(this.buscadorForm);
     //FECHA DESDE CON FORMATO CORRECTO
  var mesDesde = '' + (this.buscadorForm.fechaDesde.getMonth() + 1);
  var diaDesde = '' + this.buscadorForm.fechaDesde.getDate();
  var anioDesde = this.buscadorForm.fechaDesde.getFullYear();
  if (mesDesde.length < 2) mesDesde = '0' + mesDesde;
  if (diaDesde.length < 2) diaDesde = '0' + diaDesde;
  var fechaFormatoCorrectoDesde =  [anioDesde, mesDesde, diaDesde].join('-');
  fechaFormatoCorrectoDesde.toString();
  console.log(fechaFormatoCorrectoDesde);
   //FECHA HASTA CON FORMATO CORRECTO
   var mesHasta = '' + (this.buscadorForm.fechaHasta.getMonth() + 1);
   var diaHasta = '' + this.buscadorForm.fechaHasta.getDate();
   var anioHasta = this.buscadorForm.fechaHasta.getFullYear();
   if (mesHasta.length < 2) mesHasta = '0' + mesHasta;
   if (diaHasta.length < 2) diaHasta = '0' + diaHasta;
   var fechaFormatoCorrectoHasta =  [anioHasta, mesHasta, diaHasta].join('-');
   fechaFormatoCorrectoHasta.toString();
   this.x = fechaFormatoCorrectoHasta;
   console.log(fechaFormatoCorrectoHasta);

  console.log(form.value);
  
  let params = new HttpParams().set("tipoBusqueda",this.buscadorForm.tipoBusqueda).set("descripcionBusqueda", this.buscadorForm.descripcionBusqueda).set("fechaDesde", fechaFormatoCorrectoDesde.toString()).set("fechaHasta", fechaFormatoCorrectoHasta.toString()); //Create new HttpParams
  console.log("ESTOS SON LOS PARAMETROS " + params);
  console.log(form.value);
  return this.http.get(this.serverUrl.serverUrl + '/api/cambioCondiciones/busqueda', {headers: this.agregarAutorizacionHeader(),params: params}).subscribe(

    data  => {
    this.datosBusqueda = data;
    this.data = data;
    swal.fire('Cambios','los datos fueron recuperados con éxito',"success" );
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 /* public saveDataUsuario(form){
    console.log(form.value);
    return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

      data  => {
      this.datosBusqueda = data;
      console.log("PUT Request is successful ", data);
      
      });

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
}*/
    
  }
  


