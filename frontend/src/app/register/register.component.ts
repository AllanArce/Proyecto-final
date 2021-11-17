import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { guardarregistroresponse } from '../Models/guardarregistroresponse';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    user: new FormControl('',[Validators.required, Validators.email]),    
    password: new FormControl('',[Validators.required]),
    password2: new FormControl('', [Validators.required])
  })


  constructor(private router: Router, private backend: BackendService) {
    const bodyElement = document.body;
    if (bodyElement)
    {
      bodyElement.classList.remove('sidebar-mini');
      bodyElement.classList.remove('register-page');
      bodyElement.classList.remove('full-bg-1');
      bodyElement.classList.add('login-page');
      bodyElement.classList.add('full-bg-2');
      
    }
   }

  ngOnInit(): void {
  }

  //ingresamos los datos de un nuevo usuario
  async registerUser()
  {
    if (this.registerForm.controls['user'].invalid)
    {
      this.registerForm.controls['user'].setErrors(null);
      Swal.fire('Error', 'El usuario debe ser un correo valido.', 'error'); 
    }
    else
    {
      if (this.registerForm.controls['name'].invalid)
      {
        this.registerForm.controls['name'].setErrors(null);
        Swal.fire('Error', 'Debe ingresar el campo nombre.', 'error'); 
      }
      else
      {
        if (this.registerForm.controls['password'].invalid || this.registerForm.controls['password2'].invalid)
        {
          this.registerForm.controls['password'].setErrors(null);
          Swal.fire('Error', 'Debe ingresar el password y su confirmación.', 'error'); 
        }
        else
        {
          if (this.registerForm.controls['password'].value !=this.registerForm.controls['password2'].value)
          {
            Swal.fire('Error', 'El password y su confirmación no son iguales.', 'error');
          }
          else
          {
            const verifica = await this.backend.existinguser(this.registerForm.controls['user'].value).toPromise();
            if (verifica.status==1)
            {
              Swal.fire('Error', 'El correo electrónico ingresado ya fue registrado previamente.', 'error');
            }
            else
            {
              let clave = btoa(this.registerForm.controls['password'].value);

              this.backend.insertaUsuario(this.registerForm.controls['name'].value,this.registerForm.controls['user'].value,clave).subscribe( x =>{
                if (x.status==1)
                {
                  Swal.fire('Registro de Usuario','El usuario ha sido registrado exitosamente','success').then(()=>{
                    this.irA('home/login');
                  });
                
                  
                }
                else
                {
                  Swal.fire('Error', x.mensaje, 'error');
                }
              });
            }
          }
        }
      }
    }

    
  }

  irA(ruta: string){
    this.router.navigateByUrl("/"+ruta);
  }

}
