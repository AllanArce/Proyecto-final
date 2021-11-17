import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { departamento } from 'src/app/Models/departamento';
import { municipio } from 'src/app/Models/municipio';
import { FormGroup, FormControl } from "@angular/forms";
import { filtro } from 'src/app/Models/filtro';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  @Output() newSearchEvent = new EventEmitter<filtro>();

  deptoSel:departamento = new departamento(-1,'Seleccione');
  muniSel:municipio = new municipio(0, 0,'Seleccione');
  deptos:departamento[];
  munis:municipio[];

  searchForm = new FormGroup({
    selectDepto:new FormControl(''),
    selectMuni:new FormControl(''),
    inputZona:new FormControl(''),
    inputHabitaciones:new FormControl(''),
    inputMinimo:new FormControl(''),
    inputMaximo:new FormControl(''),
    inputPalabra:new FormControl('')

  });

  constructor(private backend: BackendService) { 
    this.deptos=[];
    this.munis=[];
  
  }

  ngOnInit(): void 
  {
    this.backend.getDepartamentos().subscribe(x=>{
      this.deptos=x.departamentos;
      this.searchForm.controls['selectDepto'].setValue(0);
      this.onSelDepto();
    });

    
  }

  onSelDepto()
  {
    if (this.deptoSel.id != this.searchForm.controls['selectDepto'].value) 
    {
      this.deptoSel.id = this.searchForm.controls['selectDepto'].value;
      this.backend.getMunicipios(this.deptoSel.id).subscribe(m=>{
        //this.munis=m.municipios;
        this.munis = m.municipios;
      });
      this.searchForm.controls['selectMuni'].setValue(0);
    }
  }
  
  onsubmit()
  {
    let iddep = this.searchForm.controls['selectDepto'].value;
    let idmun = this.searchForm.controls['selectMuni'].value;
    let zona = this.searchForm.controls['inputZona'].value;
    let hab = this.searchForm.controls['inputHabitaciones'].value;
    let minimo = this.searchForm.controls['inputMinimo'].value;
    let maximo = this.searchForm.controls['inputMaximo'].value;
    let palabra = this.searchForm.controls['inputPalabra'].value;

    let resultado = new filtro(iddep, idmun, zona, hab, minimo, maximo, palabra);

    this.newSearchEvent.emit(resultado);
  }

}
