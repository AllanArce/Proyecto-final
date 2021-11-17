import { Component, OnInit, Input } from '@angular/core';
import { contractItem } from 'src/app/Models/contractItem';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  @Input() contrato:contractItem = new contractItem(0,0,0,'','','',0,0,0,0,0,0,0,0,'','','','');

  constructor() { }

  ngOnInit(): void {
  }

}
