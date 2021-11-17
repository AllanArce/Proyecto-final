import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../service/backend.service';
import { mensajeItem } from '../Models/mensajeItem';
//import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombreUsuario:string;
  emailUsuario:string;
  idUsuario:number;
  mensajes:mensajeItem[];

  constructor(private router: Router, private backend: BackendService) 
  { 
    this.nombreUsuario="Nombre de usuario";
    this.emailUsuario="";
    this.idUsuario=0;
    this.mensajes=[];

    const bodyElement = document.body;
    if (bodyElement)
    {
      
      bodyElement.classList.remove('sidebar-mini');
      bodyElement.classList.remove('register-page');
      bodyElement.classList.remove('login-page');
      bodyElement.classList.remove('full-bg-2');
      bodyElement.classList.remove('full-bg-1');

      bodyElement.classList.add('sidebar-mini');
    }

  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');

    var vId = localStorage.getItem('userId');
    var vEmail = localStorage.getItem('email');
    var vNombre = localStorage.getItem('nombre');
    
    if (vId != null && vId !=undefined && vEmail != null && vEmail != undefined && vNombre !=null && vNombre!=undefined)
    {
        this.nombreUsuario = vNombre;
        this.emailUsuario = vEmail;
        this.idUsuario = +vId;

        this.getMessages();
    }
    else
    {
        //localStorage.clear();
        this.irA("home/login");
    }
  }

  irA(ruta: string){
    this.router.navigateByUrl("/"+ruta);
  }

  getMessages()
  {
      this.backend.getMessages('unread',this.idUsuario,0).subscribe(x=>{
        this.mensajes=x.mensajes;
      });
  }


  onLogout()
  {
    localStorage.clear();
    this.irA("home/login");
  }

  ruta1()
  {
    this.irA("home/dashboard/operacion?id=1");
  }

  ruta2()
  {
    this.irA("home/dashboard/operacion?id=2");
  }

  
  ruta3()
  {
    this.irA("home/dashboard/operacion?id=3");
  }
  ruta4()
  {
    this.irA("home/dashboard/operacion?id=4");
  }

  ruta5()
  {
    this.irA("home/dashboard/operacion?id=5");
  }


}
