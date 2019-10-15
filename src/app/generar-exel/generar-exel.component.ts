import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../app/services/excel.service';

@Component({
  selector: 'app-generar-exel',
  templateUrl: './generar-exel.component.html',
  styleUrls: ['./generar-exel.component.css']
})
export class GenerarExelComponent implements OnInit {
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];
  constructor(private excelService:ExcelService) { }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
  ngOnInit() {
  }

}
