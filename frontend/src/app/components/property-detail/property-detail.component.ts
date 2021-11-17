import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { propiedadItem } from '../../Models/propiedadItem';
import {environment} from '../../../environments/environment.prod';
import { imagen } from 'src/app/Models/imagen';
import { BackendService } from '../../service/backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const SITE_URL = environment.urlBackEnd;
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  @Input() propiedad = new propiedadItem(0,0,'',0,0,0,0,0,'',0,0,'','','',0,'','',0,0,0,0,'','',0);
  @Output() newReturnEvent = new EventEmitter<boolean>();

  imagenes:imagen[];
  sharedurl:string="";
  submitted:boolean=false;

  mensajeForm = new FormGroup({
    inputNombre:new FormControl(null, [Validators.required]),
    inputEmail:new FormControl(null,[Validators.required]),
    inputTelefono:new FormControl(null),
    inputMensaje:new FormControl(null,[Validators.required] )
  });

  constructor(private backend:BackendService) { 
    this.imagenes=[];
  }

  ngOnInit(): void {
    this.sharedurl = SITE_URL+"/home/landing?id="+this.propiedad.idpropiedad;

    this.backend.getImages(this.propiedad.idpropiedad).subscribe(x =>{
      this.imagenes=x.imagenes;
      
    });
  }

  clickRegresar()
    {
      this.newReturnEvent.emit(true);
    }

    limpiaForm()
    {
      this.mensajeForm.reset();
    }

    onSubmitMsg()
    {
      this.submitted=true;
    }

    get f() { return this.mensajeForm.controls; }

}
