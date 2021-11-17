import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { departamento } from 'src/app/Models/departamento';
import { imagen } from 'src/app/Models/imagen';
import { municipio } from 'src/app/Models/municipio';
import { propiedadItem } from 'src/app/Models/propiedadItem';
import { BackendService } from 'src/app/service/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  @Output() returnEvent = new EventEmitter<boolean>();
  
  //inputs
  @Input() propiedad:propiedadItem=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
  @Input() operacion="view";
  

  //variables de la forma
  deptoSel:departamento = new departamento(-1,'Seleccione');
  muniSel:municipio = new municipio(0, 0,'Seleccione');
  deptos:departamento[];
  munis:municipio[];
  imagenes:imagen[];
  isView:boolean = true;
  isAdd:boolean = true;
  tituloopr:string="";
  msjopr:string="";
  userid:number;
  submitted:boolean=false;


  //forma
  inputForm = new FormGroup({
    selectDepto:new FormControl(null,[Validators.required]),
    selectMuni:new FormControl(null,[Validators.required]),
    selectTipo:new FormControl(null, [Validators.required]),
    selectImagen:new FormControl(null),
    inputZona:new FormControl(null, [Validators.required]),
    inputHabitaciones:new FormControl(null, [Validators.required]),
    inputParqueos:new FormControl(null, [Validators.required]),
    inputDescripcion:new FormControl(null, [Validators.required]),
    inputNombre:new FormControl(null, [Validators.required]),
    inputDireccion:new FormControl(null,[Validators.required]),
    inputArea:new FormControl(null, [Validators.required]),
    inputBanios:new FormControl(null, [Validators.required]),
    inputPrecio:new FormControl(null, [Validators.required]),
    checkPublicado:new FormControl(null),
    checkArrendado:new FormControl(null),
    inputEmail:new FormControl(null,[Validators.required, Validators.email]),
    inputTelefono:new FormControl(null, [Validators.required])

  });

  
  constructor(private backend: BackendService) 
  {
    this.deptos=[];
    this.munis=[];
    this.imagenes=[];

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

    this.backend.getDepartamentos().subscribe(x=>{
      this.deptos=x.departamentos;
      
      this.onSelDepto();
    });
    this.getImages();

    this.actualizaInfo();
    
  }

  onSelDepto()
  {
    if (this.deptoSel.id != this.inputForm.controls['selectDepto'].value) 
    {
      this.deptoSel.id = this.inputForm.controls['selectDepto'].value;
      this.backend.getMunicipios(this.deptoSel.id).subscribe(m=>{
        //this.munis=m.municipios;
        this.munis = m.municipios;
      });
      
    }
  }

  actualizaInfo()
  {
    if (this.propiedad.idpropiedad>0)
    {
      this.inputForm.controls['selectDepto'].setValue(this.propiedad.iddepto),
      this.inputForm.controls['selectMuni'].setValue(this.propiedad.idmunicipio);
      this.inputForm.controls['selectTipo'].setValue(this.propiedad.idtipo);
      this.inputForm.controls['selectImagen'].setValue(this.propiedad.idimagen);
      this.inputForm.controls['inputZona'].setValue(this.propiedad.zona);
      this.inputForm.controls['inputHabitaciones'].setValue(this.propiedad.numero_habitaciones);
      this.inputForm.controls['inputParqueos'].setValue(this.propiedad.parqueos);
      this.inputForm.controls['inputDescripcion'].setValue(this.propiedad.descripcion);
      this.inputForm.controls['inputNombre'].setValue(this.propiedad.nombre_propiedad);
      this.inputForm.controls['inputDireccion'].setValue(this.propiedad.direccion);
      this.inputForm.controls['inputArea'].setValue(this.propiedad.area_total);
      this.inputForm.controls['inputBanios'].setValue(this.propiedad.numero_banios);
      this.inputForm.controls['inputPrecio'].setValue(this.propiedad.precio);
      var publicado = this.propiedad.estatus_publicado==2;
      var arrendado = this.propiedad.arrendada==1;
      this.inputForm.controls['checkPublicado'].setValue(publicado);
      this.inputForm.controls['checkArrendado'].setValue(arrendado);
      this.inputForm.controls['inputEmail'].setValue(this.propiedad.email);
      this.inputForm.controls['inputTelefono'].setValue(this.propiedad.telefonos);
      
    }
    else
    {
      this.inputForm.reset();
    }

    if (this.operacion=="add")
    {
      this.tituloopr="Agregar Propiedad";
      this.msjopr ="Propiedad agregada exitosamente.";
    }
    else
    {
      if (this.operacion=="edit")
      {
        this.tituloopr="Modificar Propiedad";
        this.msjopr ="Propiedad modificada exitosamente.";
      }
      else
      {
        this.tituloopr="Consulta de propiedad"
      }
    }
    this.isAdd = this.operacion=="add";
    this.isView= this.operacion=="view";
  }

  setPropiedad()
  {
    
    var id = this.propiedad.idpropiedad;
    this.propiedad=new propiedadItem(0,0,"",0,0,0,0,0,"",0,0,"","","",0,"","",0,0,0,0,"","",0);
    this.propiedad.idpropiedad=id;
    this.propiedad.area_total=this.inputForm.controls['inputArea'].value;
    this.propiedad.direccion=this.inputForm.controls['inputDireccion'].value;
    this.propiedad.numero_habitaciones=this.inputForm.controls['inputHabitaciones'].value;
    this.propiedad.numero_banios=this.inputForm.controls['inputBanios'].value;
    this.propiedad.parqueos=this.inputForm.controls['inputParqueos'].value;
    this.propiedad.precio=this.inputForm.controls['inputPrecio'].value;
    if (this.inputForm.controls['checkArrendado'].value==true)
    {
      this.propiedad.arrendada=1;
    }
    else
    {
      this.propiedad.arrendada=0;
    }
    
    this.propiedad.descripcion=this.inputForm.controls['inputDescripcion'].value;
    this.propiedad.estatus=1;
    if (this.inputForm.controls['checkPublicado'].value==true)
    {
      this.propiedad.estatus_publicado=2;
    }
    else
    {
      this.propiedad.estatus_publicado=0;
    }
    this.propiedad.nombre_propiedad=this.inputForm.controls['inputNombre'].value;
    this.propiedad.zona=this.inputForm.controls['inputZona'].value;
    this.propiedad.idtipo=this.inputForm.controls['selectTipo'].value;
    this.propiedad.iddepto = this.inputForm.controls['selectDepto'].value;
    this.propiedad.idmunicipio = this.inputForm.controls['selectMuni'].value;
    this.propiedad.idlogin = this.userid;
    this.propiedad.telefonos = this.inputForm.controls['inputTelefono'].value;
    this.propiedad.email = this.inputForm.controls['inputEmail'].value;
    this.propiedad.idimagen=this.inputForm.controls['selectImagen'].value;
    
  }

  getImages()
  {
    this.backend.getImages(this.propiedad.idpropiedad).subscribe(x =>{
      this.imagenes=x.imagenes;
      
    });
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
      this.setPropiedad();

      if (this.operacion=="add")
      {
        this.backend.insertProperty(this.propiedad).subscribe(x=>{
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
          this.backend.updateProperty(this.propiedad).subscribe(x=>{
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
    if (this.isAdd==true)
    {
      return "col-md-12";
    }
    else
    {
      return "col-md-9";
    }
  }

  actualizaImagenes(paso:boolean)
  {
    
    this.getImages();
  }
}
