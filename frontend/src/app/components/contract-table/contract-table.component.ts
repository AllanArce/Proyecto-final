import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Subject } from 'rxjs';
import { contractItem } from 'src/app/Models/contractItem';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements OnInit {

  //opciones y trigger de datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //eventos
  @Output() selectEvent = new EventEmitter<contractItem>();
  @Output() viewEvent = new EventEmitter<contractItem>();
  @Output() editEvent = new EventEmitter<contractItem>();
  
  //inputs
  @Input() tipo:string="edit";


  //variables locales
  idUsuario:number;
  contratos:contractItem[];
  primeravez:boolean =true;

  constructor(private backend: BackendService) 
  { 
    this.idUsuario=0;
    this.contratos=[];
    var vId = localStorage.getItem('userId');
    if (vId != null && vId !=undefined)
    {
      this.idUsuario = +vId;
      this.getContracts();
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      
      searching:true,
      responsive:true,
      language:{url:'//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'}
    };
  }

  getContracts()
  {
    this.backend.getContracts(this.idUsuario).subscribe(x=>{
      if (x.status==1)
      {
        this.contratos = x.contratos;
      }
      if (this.primeravez==true)
      {
        this.dtTrigger.next();
        this.primeravez=false;
      }
      
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onSelect(prop:contractItem)
  {
    this.selectEvent.emit(prop);
  }

  onView(prop:contractItem)
  {
    this.viewEvent.emit(prop);
  }

  onEdit(prop:contractItem)
  {
    this.editEvent.emit(prop);
  }

  onDelete(prop:contractItem)
  {
    
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Contrato',
      text: 'Esta seguro de eliminar el contrato '+prop.idcontrato+' ?',
      showCancelButton: false,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
      
    }).then((result) => {
      if (result.isConfirmed) {
        prop.estatus=0;
        this.eliminaContrato(prop);
      } 
    })
    ;
  }

  eliminaContrato(prop:contractItem)
  {
    this.backend.updateContract(prop).subscribe(x=>{
      if (x.status==1)
      {
        Swal.fire('Eliminar contrato', 'Contrato eliminado exitosamente', 'success');
        this.getContracts();
      }
      else
      {
        Swal.fire('Eliminar contrato', 'Ha ocurrido un error al eliminar el contrato', 'error');
      }
    });
    
  }


}
