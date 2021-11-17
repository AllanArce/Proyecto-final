import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment.prod"

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nombresitio:string = environment.sitename;
  loggedIn=false;

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
