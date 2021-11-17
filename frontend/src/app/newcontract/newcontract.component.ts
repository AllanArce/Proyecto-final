import { Component, OnInit } from '@angular/core';
import { propiedadItem } from '../Models/propiedadItem';

@Component({
  selector: 'app-newcontract',
  templateUrl: './newcontract.component.html',
  styleUrls: ['./newcontract.component.css']
})
export class NewcontractComponent implements OnInit {

  //variables para componentes
  tipotabla:string  = "select";
  titulo:string = "Seleccione una Propiedad para Contrato"
  textoboton:string = "Agregar Propiedad";
  tipoOperacion:string="add";
  mostrarboton:boolean=false;
  showTable:boolean = true;
  showTitle:boolean   = true;
  showForm:boolean = false;

  propiedadSel:propiedadItem=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);

  constructor() { }

  ngOnInit(): void {
  }

  onSelProp(propiedad:propiedadItem)
  {
    this.propiedadSel = propiedad;
    this.showTable=false;
    this.showTitle=false;
    this.showForm=true;
    
  }

  muestraForma(flag:boolean)
  {
    this.showTitle=!flag;
    this.showTable=!flag;
    this.showForm=flag;
  }


  onReturn(ret:boolean)
  {
    this.muestraForma(!ret);
  }
}
