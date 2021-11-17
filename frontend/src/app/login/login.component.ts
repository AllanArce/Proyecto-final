import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormControlName, Validators} from '@angular/forms';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  

  loginForm = new FormGroup({
    user:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required])
  });


  constructor(private router: Router, private backend: BackendService) 
  {
    const bodyElement = document.body;
    if (bodyElement)
    {
      bodyElement.classList.remove('sidebar-mini');
      bodyElement.classList.remove('register-page');
      bodyElement.classList.remove('full-bg-2');
      bodyElement.classList.remove('layout-top-nav');
      bodyElement.classList.add('login-page');
      bodyElement.classList.add('full-bg-1');
    }
  }
  ngAfterViewInit(): void {
    
  }

  
  ngOnInit(): void {
    $('[data-widget="iframe"]').IFrame('init');
    $('body').Layout('init');
    
  }

  loginUser() 
  {
    
    if (this.loginForm.controls['user'].invalid)
    {

        this.loginForm.controls['user'].setErrors(null);
        Swal.fire('Error', 'El usuario debe ser un correo valido.', 'error');    
    }
    else
    {
        if (this.loginForm.controls['password'].invalid)
        {
          this.loginForm.controls['password'].setErrors(null);
          Swal.fire('Error', 'Debe ingresar su contraseña.', 'error');
        }
        else
        {
          let clave = btoa(this.loginForm.controls['password'].value);
          this.backend.mLogin(this.loginForm.controls['user'].value, clave).subscribe(x =>{
            if (x.status==1)
            {
              localStorage.setItem('token',x.token);
              localStorage.setItem('userId', x.userid.toString());
              localStorage.setItem('nombre', x.name);
              localStorage.setItem('email', this.loginForm.controls['user'].value);
              Swal.fire('Inicio de sesion','Se ha identificado exitosamente','success').then(()=>{
                this.irA('home/dashboard');
              });
            }
            else{
              Swal.fire('Error','Usuario o clave incorrecta','error');
            }
          });
        }
    }
    
    

    
    
  }

  irA(ruta: string){
    this.router.navigateByUrl("/"+ruta);
  }

}
