import { Component, OnInit } from '@angular/core';
import { propiedadItem } from '../Models/propiedadItem';
import { propiedadList } from '../Models/propiedadList';
import { BackendService } from '../service/backend.service';
import { environment } from "../../environments/environment.prod"
import { ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  nombresitio:string = environment.sitename;
  versionsitio:string =environment.siteversion;
  urlsitio:string = environment.siteurl;
  propiedades:propiedadItem[];
  //para mostrar las ultimas propiedades
  tipopanel:string = "top";
  titulopanel:string = "Ultimas propiedades publicadas";
  propsel:propiedadItem;
  paramId:string="";

  //control displays
  displayProp=false;
  displayDetail=false;
  loggedIn=false;


  constructor(private backend: BackendService, private route:ActivatedRoute) { 
    const bodyElement = document.body;
    if (bodyElement)
    {
      bodyElement.classList.remove('sidebar-mini');
      bodyElement.classList.remove('register-page');
      bodyElement.classList.remove('login-page');
      bodyElement.classList.remove('full-bg-2');
      bodyElement.classList.remove('full-bg-1');

      bodyElement.classList.add('layout-top-nav');
    }

    this.propiedades=[];
    
    this.propsel = new propiedadItem(0,0,'',0,0,0,0,0,'',0,0,'','','',0,'','',0,0,0,0,'','',0);


    var vId = localStorage.getItem('userId');
    var vEmail = localStorage.getItem('email');
    var vNombre = localStorage.getItem('nombre');
    
    this.loggedIn= vId != null && vId !=undefined && vEmail != null && vEmail != undefined && vNombre !=null && vNombre!=undefined;
    

  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.paramId = params.id;
      }
    );
    if (this.paramId != undefined)
    {
      
      this.backend.getProperty(this.paramId).subscribe(x =>{
        this.propiedades=x.propiedades;
        if (x.propiedades.length>0)
        {
          this.propsel = x.propiedades[0];
          this.displayProp=false;
          this.displayDetail=true;
        }
        else
        {
          this.displayProp=true;
          this.displayDetail=false;
        }
      });
    }
    else
    {
      this.displayProp=true;
      this.displayDetail=false;
    }
  }
  
  seleccionaPropiedad(prop:propiedadItem)
  {
    this.propsel = prop;
    this.displayProp=false;
    this.displayDetail=true;
  }
  
  retornaPanel(flag:boolean)
  {
    this.displayProp=true;
    this.displayDetail=false;
  }

  retornaInicio()
  {
    this.displayProp=true;
    this.displayDetail=false;
  }

}
