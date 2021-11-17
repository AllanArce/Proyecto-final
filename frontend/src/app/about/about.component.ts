import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment.prod"


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  nombresitio:string = environment.sitename;
  versionsitio:string =environment.siteversion;
  urlsitio:string = environment.siteurl;
  loggedIn:boolean=false;

  constructor() { 
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
  }

  ngOnInit(): void {
    var vId = localStorage.getItem('userId');
    var vEmail = localStorage.getItem('email');
    var vNombre = localStorage.getItem('nombre');
    
    this.loggedIn= vId != null && vId !=undefined && vEmail != null && vEmail != undefined && vNombre !=null && vNombre!=undefined;
    
  }

}
