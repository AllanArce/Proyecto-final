import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { archivo } from '../Models/archivo';

import {fileupload} from '../Models/fileupload';
import { imagen } from '../Models/imagen';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/img';
  private basePathc = '/contratos';
  img:imagen;
  salida:number;
  arch:archivo;

  constructor(private storage: AngularFireStorage, private backend:BackendService) {
    this.img = new imagen(0,0,'','');
    this.arch = new archivo(0,0,'','');
    this.salida=0;
   }

  pushFileToStorage(idpropiedad:number, fileUpload: fileupload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.img.url = downloadURL;
          this.img.anotacion = fileUpload.file.name;
          this.img.idpropiedad = idpropiedad;
          this.saveFileData(this.img);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(pimg:imagen): void {
    this.backend.insertImage(pimg).subscribe(x=>{
      this.salida = x.status;
    })
  }

  private saveFileDataContract(parch:archivo): void {
    this.backend.insertFile(parch).subscribe(x=>{
      this.salida = x.status;
    })
  }


  pushContractFileToStorage(idcontrato:number, fileUpload: fileupload): Observable<number | undefined> {
    const filePath = `${this.basePathc}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.arch.url = downloadURL;
          this.arch.anotacion = fileUpload.file.name;
          this.arch.idcontrato = idcontrato;
          this.saveFileDataContract(this.arch);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

}
