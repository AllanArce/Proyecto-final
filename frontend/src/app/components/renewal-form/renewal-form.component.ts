import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/service/backend.service';
import Swal from 'sweetalert2';
import { contractItem } from 'src/app/Models/contractItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renewal-form',
  templateUrl: './renewal-form.component.html',
  styleUrls: ['./renewal-form.component.css']
})
export class RenewalFormComponent implements OnInit {

  @Output() returnEvent = new EventEmitter<boolean>();
  @Input() contrato:contractItem = new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
  msjopr:string="";
  userid:number;
  submitted:boolean=false;

  //forma
  contractForm = new FormGroup({
    inputNombrePropiedad:new FormControl(null),
    inputInquilino:new FormControl(null,),
    inputFiador:new FormControl(null,),
    inputFechaInicio:new FormControl(null, ),
    inputFechaFin:new FormControl(null),
    inputPrecioInicio:new FormControl(null, ),
    inputPrecioContrato:new FormControl(null, ),
    inputDeposito:new FormControl(null, ),
    inputNuevaDuracion:new FormControl(null, Validators.required),
    inputNuevoPrecio:new FormControl(null, Validators.required)
  });

  get f() { return this.contractForm.controls; }

  constructor(private router: Router, private backend: BackendService) {
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

  ngOnInit(): void 
  {
    this.setValor('inputNombrePropiedad', this.contrato.nombre_propiedad);
    this.setValor('inputInquilino', this.contrato.inquilino);
    this.setValor('inputFiador', this.contrato.fiador);
    this.setValor('inputFechaInicio', this.contrato.fecha_inicio);
    this.setValor('inputFechaFin', this.contrato.fecha_fin);
    this.setValor('inputPrecioInicio', this.contrato.precio_inicio.toString());
    this.setValor('inputPrecioContrato', this.contrato.precio_contrato.toString());
    this.setValor('inputDeposito', this.contrato.deposito.toString());
  }

  setValor(campo:string, valor:string)
  {
    this.contractForm.controls[campo].setValue(valor);
  }

  onSubmit()
  {
    this.submitted=true;
    if (this.contractForm.valid)
    {
      var duracion = +this.contractForm.controls['inputNuevaDuracion'].value;
      var monto= +this.contractForm.controls['inputNuevoPrecio'].value;

      this.backend.saveRenewal(this.contrato.idcontrato,monto, duracion, this.userid).subscribe(x=>{
        if (x.status==1)
        {
          Swal.fire({
            icon: 'success',
            title: 'Renovacion',
            text: 'Renovacion registrada exitosamente',
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
  }

  closeForm()
  {
    this.returnEvent.emit(true);
  }

  irA(ruta: string){
    this.router.navigateByUrl("/"+ruta);
  }
}
