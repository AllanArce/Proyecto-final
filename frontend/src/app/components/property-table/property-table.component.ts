import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Subject } from 'rxjs';
import { propiedadItem } from 'src/app/Models/propiedadItem';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements OnInit, OnDestroy {

  //opciones y trigger de datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //eventos
  @Output() selectEvent = new EventEmitter<propiedadItem>();
  @Output() viewEvent = new EventEmitter<propiedadItem>();
  @Output() editEvent = new EventEmitter<propiedadItem>();
  
  //inputs
  @Input() tipo:string="edit";


  //variables locales
  idUsuario:number;
  propiedades:propiedadItem[];
  primeravez:boolean =true;

  constructor(private backend: BackendService) { 
    this.idUsuario=0;
    this.propiedades=[];
    var vId = localStorage.getItem('userId');
    if (vId != null && vId !=undefined)
    {
      this.idUsuario = +vId;
      this.getProperties();
    }
  }

  ngOnInit(): void 
  {

    this.dtOptions = {
      
      searching:true,
      responsive:true,
      language:{url:'//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'}
    };

  }


  getProperties()
  {
    this.backend.getMyProperties(this.idUsuario).subscribe(x=>{
      if (x.status==1)
      {
        this.propiedades = x.propiedades;
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

  onSelect(prop:propiedadItem)
  {
    this.selectEvent.emit(prop);
  }

  onView(prop:propiedadItem)
  {
    this.viewEvent.emit(prop);
  }

  onEdit(prop:propiedadItem)
  {
    this.editEvent.emit(prop);
  }

  onDelete(prop:propiedadItem)
  {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar propiedad',
      text: 'Esta seguro de eliminar la propiedad '+prop.nombre_propiedad+' ?',
      showCancelButton: false,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminaPropiedad(prop);
      } 
    })
    ;
  }

  eliminaPropiedad(prop:propiedadItem)
  {
    this.backend.deleteProperty(prop.idpropiedad).subscribe(x=>{
      if (x.status==1)
      {
        Swal.fire('Eliminar propiedad', 'Propiedad eliminada exitosamente', 'success');
        this.getProperties();
      }
      else
      {
        Swal.fire('Eliminar propiedad', 'Ha ocurrido un error al eliminar la propiedad', 'error');
      }
    });
    
  }

}
