import { Component, OnInit } from '@angular/core';
import { propiedadItem } from '../Models/propiedadItem';
import { contractItem } from '../Models/contractItem'
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  //variables para componentes
  tipotabla:string  = "edit";
  titulo:string = "Mantenimiento de Contratos"
  textoboton:string = "Agregar Contrato";
  tipoOperacion:string="view";
  mostrarboton:boolean=false;
  showTable:boolean = true;
  showTitle:boolean   = true;
  showForm:boolean = false;


  propiedadSel:propiedadItem=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
  contratoSel:contractItem= new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');

  propiedades:propiedadItem[];
  userid:number;

  constructor(private backend:BackendService) 
  { 
    this.limpiaDatos();
    this.propiedades=[];
    var vId = localStorage.getItem('userId');
    if (vId != null && vId !=undefined)
    {
      this.userid= +vId;
    }
    else
    {
      this.userid=0;
    }
  }

  limpiaDatos()
  {
    this.propiedadSel=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
    this.contratoSel= new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
  }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties()
  {
    this.backend.getMyProperties(this.userid).subscribe(x=>{
      this.propiedades=x.propiedades;
    });
  }

  buscaPropiedad(idp:number)
  {
    this.propiedadSel= this.propiedades.filter(p=> p.idpropiedad == idp)[0];
  }

  onViewProp(pcont:contractItem)
  {
    this.tipoOperacion="view";
    this.contratoSel=pcont;
    this.buscaPropiedad(pcont.idpropiedad);
    this.muestraForma(true);
  }

  onEditProp(pcont:contractItem)
  {
    this.tipoOperacion="edit";
    this.contratoSel=pcont;
    this.buscaPropiedad(pcont.idpropiedad);
    this.muestraForma(true);
  }

  onAddProp(dato:boolean)
  {
    this.tipoOperacion="add";
    this.limpiaDatos();
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
