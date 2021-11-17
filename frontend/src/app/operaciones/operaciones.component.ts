import { Component, OnInit, SimpleChanges } from '@angular/core';
import { contractItem } from '../Models/contractItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  paramId:string="";
/*
  1 - renovacion
  2 - incremento
  3 - cobro
  4 - pago
  5 - estado de cuenta

*/

  tipotabla:string  = "select";
  titulo:string = "Seleccione un Contrato"
  textoboton:string = "Agregar Propiedad";
  tipoOperacion:string="add";
  mostrarboton:boolean=false;
  showTable:boolean = true;
  showTitle:boolean   = true;

  contratoSel:contractItem= new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
//control de formularios
  showFormRenewal:boolean = false;
  showFormIncrement:boolean = false;
  showFormCobro:boolean = false;
  showFormPayment:boolean=false;
  showReport:boolean=false;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.route.queryParams
      .subscribe(params => {
        this.paramId = params.id;

        if (params.id=="1")
        {
          this.titulo = "Seleccione un Contrato a Renovar";
        }
        if (params.id=="2")
        {
          this.titulo = "Seleccione un Contrato a Incrementar";
        }
        if (params.id=="3")
        {
          this.titulo = "Seleccione un Contrato a Cobrar";
        }
        if (params.id=="4")
        {
          this.titulo = "Seleccione un Contrato a Pagar";
        }
        if (params.id=="5")
        {
          this.titulo = "Seleccione un Contrato para Estado de Cuenta";
        }
      }
    );

    this.ocultaForma();
    console.log('entra oninit');
  }

  onSelProp(pcont:contractItem)
  {
    this.contratoSel = pcont;
    this.muestraForma();
    
  }

  ocultaForma()
  {
    this.showTable=true;
    this.showTitle=true;
    this.showFormRenewal = false;
    this.showFormIncrement = false;
    this.showFormCobro = false;
    this.showFormPayment=false;
    this.showReport=false;
  }

  muestraForma()
  {
    this.showTable=false;
    this.showTitle=false;
    this.showFormRenewal = this.paramId=="1";
    this.showFormIncrement = this.paramId=="2";
    this.showFormCobro = this.paramId=="3";
    this.showFormPayment=this.paramId=="4";
    this.showReport=this.paramId=="5";
  }


  onReturn(ret:boolean)
  {
    this.ocultaForma();
  }


  ngOnChanges(changes: SimpleChanges) 
  {
    this.ocultaForma();
    console.log("pruebax");
  }

}
