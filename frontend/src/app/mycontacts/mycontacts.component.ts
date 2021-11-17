import { Component, OnInit } from '@angular/core';
import {contact} from '../Models/contact'

@Component({
  selector: 'app-mycontacts',
  templateUrl: './mycontacts.component.html',
  styleUrls: ['./mycontacts.component.css']
})
export class MycontactsComponent implements OnInit {

  tipotabla:string  = "edit";
  titulo:string = "Mis Contactos"
  textoboton:string = "Agregar Contacto";
  tipoOperacion:string="view";
  mostrarboton:boolean=true;
  showTable:boolean = true;
  showTitle:boolean   = true;
  showForm:boolean = false;

  contactoSel:contact= new contact(0,'','','','','','','','',0,0);

  constructor() { }

  ngOnInit(): void {
  }

  limpiaContacto()
  {
    this.contactoSel= new contact(0,'','','','','','','','',0,0);
  }

  onViewProp(prop:contact)
  {
    this.tipoOperacion="view";
    this.contactoSel=prop;
    this.muestraForma(true);
  }

  onEditProp(prop:contact)
  {
    this.tipoOperacion="edit";
    this.contactoSel=prop;
    this.muestraForma(true);
  }

  onAddProp(dato:boolean)
  {
    this.tipoOperacion="add";
    this.limpiaContacto();
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
