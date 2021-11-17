import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { propiedadItem } from '../../Models/propiedadItem';
import { filtro } from 'src/app/Models/filtro';
import { BackendService } from '../../service/backend.service';


@Component({
  selector: 'app-top-properties',
  templateUrl: './top-properties.component.html',
  styleUrls: ['./top-properties.component.css']
})
export class TopPropertiesComponent implements OnInit {

  @Input() titulo="Top propiedades";
  @Input() tipo="top";
  @Input() searchFilter=new filtro("X","0","", "", "", "", "");
  @Output() newSelectEvent = new EventEmitter<propiedadItem>();
  
  propiedades:propiedadItem[];
  propiedadesPartido:number[];
  itemsPerRow:number=3;

  

  constructor(private backend: BackendService) 
  {
    this.propiedades=[];
    this.propiedadesPartido=[];
  }

  ngOnChanges(changes: SimpleChanges) {


    if (this.tipo=="top")
    {
      this.backend.getAllpropiedades().subscribe(x =>{
        this.propiedades=x.propiedades;
        this.propiedadesPartido=Array.from(Array(Math.ceil(this.propiedades.length/ this.itemsPerRow)).keys());
      });
    }
    else
    {
      if (this.tipo=="filter")
      {
        if (this.searchFilter.iddep!="X")
          {        
            this.backend.getFilteredProperties(this.searchFilter).subscribe(x=>{
            this.propiedades =x.propiedades;
            this.propiedadesPartido=Array.from(Array(Math.ceil(this.propiedades.length/ this.itemsPerRow)).keys());
          });
        }
      }
    }
  }

  ngOnInit(): void {
    
  }

  getColor(prop:propiedadItem):string
    {
        if (prop.idtipo == 1 || prop.idtipo==2)
        {
            return 'bg-primary'
        }
        else
        {
            if (prop.idtipo==3 || prop.idtipo==4)
            {
                return 'bg-danger';
            }
            else
            {
                return 'bg-warning';
            }
        }
    }

    clickPropiedad(value: propiedadItem)
    {
      this.newSelectEvent.emit(value);
    }
}
