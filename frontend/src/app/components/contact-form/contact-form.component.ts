import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { contact } from 'src/app/Models/contact'
import { BackendService } from 'src/app/service/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Output() returnEvent = new EventEmitter<boolean>();
  
  //inputs
  @Input() contacto:contact=new contact(0,'','','','','','','','',0,0);
  @Input() operacion="view";
  

  //variables de la forma
  
  isView:boolean = true;
  isAdd:boolean = true;
  tituloopr:string="";
  msjopr:string="";
  userid:number;
  submitted:boolean=false;

  inputForm = new FormGroup({
    inputNombre:new FormControl(null,[Validators.required]),
    inputApellido:new FormControl(null,[Validators.required]),
    inputTelefono:new FormControl(null, [Validators.required]),
    inputEmail:new FormControl(null, [Validators.required]),
    inputLugarTrabajo:new FormControl(null),
    inputDireccionTrabajo:new FormControl(null),
    inputTelefonoTrabajo:new FormControl(null),
    inputDPI:new FormControl(null, [Validators.required])
  });

  constructor(private backend: BackendService) 
  {
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

  ngOnInit(): void {
    this.actualizaInfo();
  }


  actualizaInfo()
  {
    if (this.contacto.idcontacto>0)
    {
      this.inputForm.controls['inputNombre'].setValue(this.contacto.nombre),
      this.inputForm.controls['inputApellido'].setValue(this.contacto.apellido);
      this.inputForm.controls['inputTelefono'].setValue(this.contacto.telefono);
      this.inputForm.controls['inputEmail'].setValue(this.contacto.correo_electronico);
      this.inputForm.controls['inputLugarTrabajo'].setValue(this.contacto.lugar_trabajo);
      this.inputForm.controls['inputDireccionTrabajo'].setValue(this.contacto.direccion_lugar_trabajo);
      this.inputForm.controls['inputTelefonoTrabajo'].setValue(this.contacto.telefono_lugar_trabajo);
      this.inputForm.controls['inputDPI'].setValue(this.contacto.numero_dpi);
      
    }
    else
    {
      this.inputForm.reset();
    }

    if (this.operacion=="add")
    {
      this.tituloopr="Agregar Contacto";
      this.msjopr ="Contacto agregado exitosamente.";
    }
    else
    {
      if (this.operacion=="edit")
      {
        this.tituloopr="Modificar Contacto";
        this.msjopr ="Contacto modificado exitosamente.";
      }
      else
      {
        this.tituloopr="Consulta de Contacto"
      }
    }
    this.isAdd = this.operacion=="add";
    this.isView= this.operacion=="view";
  }

  setContacto()
  {
    
    var id = this.contacto.idcontacto;
    this.contacto=new contact(0,'','','','','','','','',0,0);
    this.contacto.idcontacto=id;
    this.contacto.nombre=this.inputForm.controls['inputNombre'].value;
    this.contacto.apellido=this.inputForm.controls['inputApellido'].value;
    this.contacto.telefono=this.inputForm.controls['inputTelefono'].value;
    this.contacto.correo_electronico=this.inputForm.controls['inputEmail'].value;
    this.contacto.lugar_trabajo=this.inputForm.controls['inputLugarTrabajo'].value==null?'':this.inputForm.controls['inputLugarTrabajo'].value;
    this.contacto.direccion_lugar_trabajo=this.inputForm.controls['inputDireccionTrabajo'].value==null?'':this.inputForm.controls['inputDireccionTrabajo'].value;   
    this.contacto.telefono_lugar_trabajo=this.inputForm.controls['inputTelefonoTrabajo'].value==null?'':this.inputForm.controls['inputTelefonoTrabajo'].value;
    this.contacto.numero_dpi=this.inputForm.controls['inputDPI'].value;
    this.contacto.estatus=1;
    this.contacto.idlogin=this.userid;
    
  }


  onSubmit()
  {
    this.submitted=true;
    if (this.inputForm.invalid==true)
    {     
      return;
    }
    else
    {
      this.setContacto();

      if (this.operacion=="add")
      {
        this.backend.insertContact(this.contacto).subscribe(x=>{
          if (x.status==1)
          {
            Swal.fire({
              icon: 'success',
              title: this.tituloopr,
              text: this.msjopr,
              showCancelButton: false,
              showDenyButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Ok',
              denyButtonText: 'No'
              
            }).then((result) => {
              if (result.isConfirmed) {
                this.closeForm();
              } 
            });
          }
        });
      }
      else
      {
        if (this.operacion=="edit")
        {
          this.backend.updateContact(this.contacto).subscribe(x=>{
            if (x.status==1)
            {
              Swal.fire({
                icon: 'success',
                title: this.tituloopr,
                text: this.msjopr,
                showCancelButton: false,
                showDenyButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                denyButtonText: 'No'
                
              }).then((result) => {
                if (result.isConfirmed) {
                  this.closeForm();
                } 
              });
            }
          });
        }
      }
    }
  }


  closeForm()
  {
    this.returnEvent.emit(true);
  }

  get f() { return this.inputForm.controls; }

  getClass()
  {
    return "col-md-12";
  }
}
