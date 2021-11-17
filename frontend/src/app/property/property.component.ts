import { Component, OnInit } from '@angular/core';
import { propiedadItem } from '../Models/propiedadItem';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  //variables para componentes
  tipotabla:string  = "edit";
  titulo:string = "Mantenimiento de Propiedades"
  textoboton:string = "Agregar Propiedad";
  tipoOperacion:string="view";
  mostrarboton:boolean=true;
  showTable:boolean = true;
  showTitle:boolean   = true;
  showForm:boolean = false;

  propiedadSel:propiedadItem=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);


  constructor() 
  { 
    this.limpiaPropiedad();
  }


  limpiaPropiedad()
  {
    this.propiedadSel=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
  }


  ngOnInit(): void {
  }


  onViewProp(prop:propiedadItem)
  {
    this.tipoOperacion="view";
    this.propiedadSel=prop;
    this.muestraForma(true);
  }

  onEditProp(prop:propiedadItem)
  {
    this.tipoOperacion="edit";
    this.propiedadSel=prop;
    this.muestraForma(true);
  }

  onAddProp(dato:boolean)
  {
    this.tipoOperacion="add";
    this.limpiaPropiedad();
    this.muestraForma(dato);
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
