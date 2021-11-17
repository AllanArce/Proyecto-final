import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redir1',
  templateUrl: './redir1.component.html',
  styleUrls: ['./redir1.component.css']
})
export class Redir1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.irA("/home/dasboard/operacion?id=1");
  }

  irA(ruta: string){
    this.router.navigateByUrl(ruta);
  }

}
