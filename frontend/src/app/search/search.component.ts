import { Component, OnInit } from '@angular/core';
import { filtro } from '../Models/filtro';
import { environment } from 'src/environments/environment.prod';
import { propiedadItem } from '../Models/propiedadItem';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  nombresitio:string = environment.sitename;
  versionsitio:string =environment.siteversion;
  myfilter:filtro=new filtro("X","0","","","","","");
  showSearch:boolean = false;
  showDetail:boolean = false;
  showFilter:boolean = true;
  tipob:string = "filter";
  titulobusqueda:string = "Resultados de la busqueda";
  propsel:propiedadItem;
  loggedIn=false;
  constructor() 
  { 
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

    this.propsel = new propiedadItem(0,0,'',0,0,0,0,0,'',0,0,'','','',0,'','',0,0,0,0,'','',0);
  }

  ngOnInit(): void {
    var vId = localStorage.getItem('userId');
    var vEmail = localStorage.getItem('email');
    var vNombre = localStorage.getItem('nombre');
    
    this.loggedIn= vId != null && vId !=undefined && vEmail != null && vEmail != undefined && vNombre !=null && vNombre!=undefined;
    
  }


  onSearch(pFiltro:filtro)
  {
    this.showSearch=false;
    this.myfilter=pFiltro;
    this.showSearch=true;
    this.showDetail=false;
    
  }

  seleccionaPropiedad(prop:propiedadItem)
  {
    this.propsel = prop;
    this.showSearch=false;
    this.showFilter=false;
    this.showDetail=true;
  }
  
  retornaPanel(flag:boolean)
  {
    this.showSearch=true;
    this.showDetail=false;
    this.showFilter=true;
  }

  retornaInicio()
  {
    this.showSearch=true;
    this.showDetail=false;
    this.showFilter=true;
  }

}
