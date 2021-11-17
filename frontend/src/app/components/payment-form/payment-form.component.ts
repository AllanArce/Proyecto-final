import { Component, OnInit, Input } from '@angular/core';
import { contractItem } from 'src/app/Models/contractItem';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Input() contrato:contractItem = new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');
  constructor() { }

  ngOnInit(): void {
  }

}
