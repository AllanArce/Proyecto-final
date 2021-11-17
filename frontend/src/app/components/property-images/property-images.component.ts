import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { imagen } from 'src/app/Models/imagen';
import { BackendService } from 'src/app/service/backend.service';

import { Subject } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { fileupload } from 'src/app/Models/fileupload';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent implements OnInit {

  //variables para subir archivo
  selectedFiles?: FileList;
  currentFileUpload?: fileupload;
  percentage = 0;


  //opciones y trigger de datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Input() operacion="view";
  @Input() lista:imagen[]=[];
  @Input() idpropiedad:number=0;
  @Output() newFileEvent = new EventEmitter<boolean>();

  constructor(private backend: BackendService, private uploadService: FileUploadService) 
  {
    this.dtTrigger.next();
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new fileupload('','','', file);
        this.uploadService.pushFileToStorage(this.idpropiedad, this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if (this.percentage==100)
            {

              this.onSaveFile();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }


  ngOnInit(): void 
  {
    this.dtOptions = {
      
      searching:false,
      responsive:true,
      ordering:false,
      pageLength:25,
      language:{url:'//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'}
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onDelete(pimg:imagen)
  {
    this.backend.deleteImage(pimg.idimagen).subscribe(x=>{
      if (x.status==1)
      {
        this.onSaveFile();
      }
    });
  }

  onSaveFile()
  {
    this.newFileEvent.emit(true);
  }
}
