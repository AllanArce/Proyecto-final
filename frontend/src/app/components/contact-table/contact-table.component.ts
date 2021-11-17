import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Subject } from 'rxjs';
import { contact } from 'src/app/Models/contact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {

  //opciones y trigger de datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //eventos
  @Output() selectEvent = new EventEmitter<contact>();
  @Output() viewEvent = new EventEmitter<contact>();
  @Output() editEvent = new EventEmitter<contact>();
  
  //inputs
  @Input() tipo:string="edit";


  //variables locales
  idUsuario:number;
  contactos:contact[];
  primeravez:boolean =true;

  constructor(private backend: BackendService) { 
    this.idUsuario=0;
    this.contactos=[];
    var vId = localStorage.getItem('userId');
    if (vId != null && vId !=undefined)
    {
      this.idUsuario = +vId;
      this.getContacts();
    }
  }

  getContacts()
  {
    this.backend.getContactos(this.idUsuario).subscribe(x=>{
      if (x.status==1)
      {
        this.contactos = x.contactos;
      }
      if (this.primeravez==true)
      {
        this.dtTrigger.next();
        this.primeravez=false;
      }
      
    });
  }

  
  ngOnInit(): void {

    this.dtOptions = {
      
      searching:true,
      responsive:true,
      language:{url:'//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'}
    };
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onSelect(prop:contact)
  {
    this.selectEvent.emit(prop);
  }

  onView(prop:contact)
  {
    this.viewEvent.emit(prop);
  }

  onEdit(prop:contact)
  {
    this.editEvent.emit(prop);
  }

  onDelete(prop:contact)
  {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar contacto',
      text: 'Esta seguro de eliminar el contacto '+prop.nombre+' '+prop.apellido+' ?',
      showCancelButton: false,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
      
    }).then((result) => {
      if (result.isConfirmed) {
        prop.estatus=0;
        this.eliminaContacto(prop);
      } 
    })
    ;
  }

  eliminaContacto(prop:contact)
  {
    this.backend.updateContact(prop).subscribe(x=>{
      if (x.status==1)
      {
        Swal.fire('Eliminar contacto', 'Contacto eliminado exitosamente', 'success');
        this.getContacts();
      }
      else
      {
        Swal.fire('Eliminar contacto', 'Ha ocurrido un error al eliminar el contacto', 'error');
      }
    });
    
  }

}
