import { Component, Input, OnInit } from '@angular/core';
import { contractItem } from 'src/app/Models/contractItem';

@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {

  @Input() contrato:contractItem = new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
  constructor() { }

  ngOnInit(): void {
  }

}
