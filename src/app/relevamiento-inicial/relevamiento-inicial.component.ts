import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relevamiento-inicial',
  templateUrl: './relevamiento-inicial.component.html',
  styleUrls: ['./relevamiento-inicial.component.css']
})
export class RelevamientoInicialComponent implements OnInit {
  trabajadores:any[]=[];
  constructor() {
    this.trabajadores =[1,2];
   }
   public agregarTrabajador(){
     this.trabajadores.push(1);
   }
  ngOnInit() {
  }

}
