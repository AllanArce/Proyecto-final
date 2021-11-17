import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { archivo } from 'src/app/Models/archivo';
import { contact } from 'src/app/Models/contact';
import { contractItem } from 'src/app/Models/contractItem';
import { propiedadItem } from 'src/app/Models/propiedadItem';
import { BackendService } from 'src/app/service/backend.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {

  @Output() returnEvent = new EventEmitter<boolean>();
  
  //inputs
  @Input() propiedad:propiedadItem=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
  @Input() contrato:contractItem= new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
  @Input() operacion="view";

  archivos:archivo[];
  contactos:contact[];
  
  isView:boolean = true;
  isAdd:boolean = true;
  tituloopr:string="";
  msjopr:string="";
  userid:number;
  submitted:boolean=false;

  //forma
  contractForm = new FormGroup({
    inputNombrePropiedad:new FormControl(null),
    inputDireccionPropiedad:new FormControl(null),
    selectInquilino:new FormControl(null,[Validators.required]),
    selectFiador:new FormControl(null,[Validators.required]),
    inputFechaInicio:new FormControl(null, [Validators.required]),
    inputFechaFin:new FormControl(null),
    inputAbogado:new FormControl(null, [Validators.required]),
    inputPrecioInicio:new FormControl(null, [Validators.required]),
    inputPrecioContrato:new FormControl(null, [Validators.required]),
    inputDuracion:new FormControl(null, [Validators.required]),
    checkVigente:new FormControl(null),
    inputDeposito:new FormControl(null, [Validators.required])
  });

  constructor(private router: Router, private backend: BackendService) 
  { 
    this.archivos=[];
    this.contactos=[];
    
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
    this.getFiles();
    this.getContacts();
    
    this.actualizaInfo();
  }

  

  getContacts()
  {
    this.backend.getContactos(this.userid).subscribe(x =>{
      this.contactos=x.contactos;
    });
  }

  getFiles()
  {
    this.backend.getFiles(this.contrato.idcontrato).subscribe(x =>{
      this.archivos=x.archivos;
    });
  }

  actualizaInfo()
  {
    
    if (this.contrato.idcontrato>0)
    {
      var vigente = this.contrato.estado==1;
  
      this.contractForm.controls['selectInquilino'].setValue(this.contrato.idcontacto_inquilino);
      this.contractForm.controls['selectFiador'].setValue(this.contrato.idcontacto_fiador);
      this.contractForm.controls['inputFechaInicio'].setValue(this.contrato.fecha_inicio);
      this.contractForm.controls['inputFechaFin'].setValue(this.contrato.fecha_fin);
      this.contractForm.controls['inputAbogado'].setValue(this.contrato.abogado);
      this.contractForm.controls['inputPrecioContrato'].setValue(this.contrato.precio_contrato);
      this.contractForm.controls['inputPrecioInicio'].setValue(this.contrato.precio_inicio);
      this.contractForm.controls['checkVigente'].setValue(vigente);
      this.contractForm.controls['inputDeposito'].setValue(this.contrato.deposito);
      this.contractForm.controls['inputDuracion'].setValue(this.contrato.duracion_contrato);
    }
    else
    {
      this.contractForm.reset();
      this.contractForm.controls['inputPrecioContrato'].setValue(this.propiedad.precio);
      this.contractForm.controls['inputPrecioInicio'].setValue(this.propiedad.precio);
      this.contractForm.controls['inputDeposito'].setValue(this.propiedad.precio);
    }

    this.contractForm.controls['inputNombrePropiedad'].setValue(this.propiedad.nombre_propiedad);
    this.contractForm.controls['inputDireccionPropiedad'].setValue( this.propiedad.direccion +" zona "+this.propiedad.zona+ ", "+ this.propiedad.municipio+", "+ this.propiedad.departamento);

    if (this.operacion=="add")
    {
      this.tituloopr="Agregar Contrato";
      this.msjopr ="Contrato agregado exitosamente.";
    }
    else
    {
      if (this.operacion=="edit")
      {
        this.tituloopr="Modificar Contrato";
        this.msjopr ="Contrato modificado exitosamente.";
      }
      else
      {
        this.tituloopr="Consulta de Contrato"
      }
    }
    this.isAdd = this.operacion=="add";
    this.isView= this.operacion=="view";
  }

  setContrato()
  {
    
    var id = this.contrato.idcontrato;
    this.contrato=new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
    this.contrato.idcontrato=id;
    this.contrato.idpropiedad=this.propiedad.idpropiedad;
    this.contrato.idcontacto_fiador=this.contractForm.controls['selectFiador'].value;
    this.contrato.idpropiedad=this.propiedad.idpropiedad;
    this.contrato.fecha_inicio=this.contractForm.controls['inputFechaInicio'].value;
    this.contrato.fecha_fin=this.contractForm.controls['inputFechaFin'].value;
    this.contrato.abogado=this.contractForm.controls['inputAbogado'].value;
    this.contrato.precio_contrato=this.contractForm.controls['inputPrecioContrato'].value;
    this.contrato.precio_inicio=this.contractForm.controls['inputPrecioInicio'].value;
    this.contrato.duracion_contrato=this.contractForm.controls['inputDuracion'].value;
    this.contrato.idcontacto_inquilino=this.contractForm.controls['selectInquilino'].value;
    if (this.contractForm.controls['checkVigente'].value==true)
    {
      this.contrato.estado=1;
    }
    else
    {
      this.contrato.estado=0;
    }
    
    this.contrato.deposito=this.contractForm.controls['inputDeposito'].value;
    this.contrato.estatus=1;
    this.contrato.idlogin=this.userid;
    
  }

  onSubmit()
  {
    this.submitted=true;
    if (this.contractForm.valid)
    {
      this.setContrato();
      if (this.operacion=="add")
      {
        this.backend.insertContract(this.contrato).subscribe(x=>{
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
                this.irA('home/dashboard/contract');
              } 
            });
          }
        });
      }
      else
      {
        if (this.operacion=="edit")
        {
          this.backend.updateContract(this.contrato).subscribe(x=>{
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

  get f() { return this.contractForm.controls; }

  getClass()
  {
    if (this.isAdd==true)
    {
      return "col-md-12";
    }
    else
    {
      return "col-md-9";
    }
  }


  actualizaArchivos(paso:boolean)
  {
    
    this.getFiles();
  }

  irA(ruta: string){
    this.router.navigateByUrl("/"+ruta);
  }
}
