import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Observable } from 'rxjs';
import { ExcelService  } from '../services/excel.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  public minDate: Date = new Date ("01/01/1975");
  public maxDate: Date = new Date ("01/01/2019");
  public value: Date = new Date ("05/16/2017");
  public datosBusqueda:{} = {};
  
  name = 'Angular 6';
  data: any = [];
  parametros: any = [];
    
  constructor(public router: Router, private http:HttpClient) {
  
  }

  generar(){
    this.exportAsExcelFile(this.data,'ejemplo');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
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
    fechaDesde : "",
    fechaHasta : "",
    descripcionBusqueda: "",
  }

 public buscarVariacion(form){
  console.log(form.value);
  this.parametros.push(form.tipoBusqueda);
  this.parametros.push(form.descripcionBusqueda);
  let params = new HttpParams().set("tipoBusqueda",this.buscadorForm.tipoBusqueda).set("descripcionBusqueda", this.buscadorForm.descripcionBusqueda).set("fechaDesde", this.buscadorForm.fechaDesde).set("fechaHasta", this.buscadorForm.fechaHasta); //Create new HttpParams
  return this.http.get('http://localhost:8080/api/variaciones/busqueda', {params: params}).subscribe(

    data  => {
    this.datosBusqueda = data;
    this.data = data;
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 public buscarConflicto(form){
  console.log(form.value); 
  return this.http.get('http://localhost:8080/api/conflictos/busqueda').subscribe(

    data  => {
    this.data = data;
    console.log("PUT Request is successful ", data);
    
    });

  console.log("hola");
 
 }

 public buscarCambio(form){
  console.log(form.value);
  return this.http.get('http://localhost:8080/api/cambioCondiciones/busqueda').subscribe(

    data  => {
    this.datosBusqueda = data;
    this.data = data;
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
  


