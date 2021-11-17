import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent implements OnInit {


  //eventos
  @Output() addEvent = new EventEmitter<boolean>();

  //inputs
  @Input() titulo:string="Titulo";
  @Input() addButtonText:string="Item";
  @Input() showAddButton:boolean= false;
  

  constructor() { }

  ngOnInit(): void {
  }


  onAddItem()
  {
    this.addEvent.emit(true);
  }

}
