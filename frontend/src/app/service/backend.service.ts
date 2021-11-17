import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {loginreq} from '../Models/loginreq';
import { loginresp } from '../Models/loginresp';
import { guardarregistroresponse } from '../Models/guardarregistroresponse';
import { guardarregistro } from '../Models/guardarregistro';
import { propiedadList } from '../Models/propiedadList';
import { imagenList } from '../Models/imagenList';
import { departamentoList } from '../Models/departamentoList';
import { municipioList } from '../Models/municipioList';
import { filtro } from '../Models/filtro';
import { userexist } from '../Models/userexist';
import { genericresp } from '../Models/genericresp';
import { mensajeItemList } from '../Models/mensajeItemList';
import { propiedadItem } from '../Models/propiedadItem';
import { imagen } from '../Models/imagen';
import { archivoList } from '../Models/archivoList';
import { archivo } from '../Models/archivo';
import {contactList} from '../Models/contactList';
import { contractList } from '../Models/contractList';
import {contractItem} from '../Models/contractItem'
import { contact } from '../Models/contact';
import { renewal } from '../Models/renewal';

const BE_API = environment.urlBackEnd;
const httpOptions ={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) 
  {

  }

  //realiza validacion de usuario y contraseña
  mLogin(usuario:string, clave:string)
  {
    let url: string = BE_API + '/login';
    let myreq :loginreq = new loginreq(usuario, clave);
    return this.http.post<loginresp>(url, myreq, httpOptions);
  }

  //registra un nuevo usuario
  insertaUsuario(name:string, contra: string, userna:string){
    let url: string = BE_API + '/user/insert';
    let usuario : guardarregistro = new guardarregistro(name, userna, contra);
   return this.http.post<guardarregistroresponse>(url,usuario, httpOptions);
  }

  //Obtiene las ultimas propiedades publicadas
  getAllpropiedades(){
    let url: string= BE_API + '/property/getall';
    return this.http.get<propiedadList>(url,httpOptions);
  }

  //obtiene una propiedad por id
  getProperty(idpropiedad:string)
  {
    let url: string= BE_API + '/property/?id=' + idpropiedad;
    return this.http.get<propiedadList>(url,httpOptions);
  }

  //obtiene las imagenes de una propiedad
  getImages(idpropiedad:number)
  {
    let url: string= BE_API + '/image/?id=' + idpropiedad;
    return this.http.get<imagenList>(url,httpOptions);
  }

  //obtiene la lista de departamentos
  getDepartamentos()
  {
    let url: string= BE_API + '/departamento';
    return this.http.get<departamentoList>(url,httpOptions);
  }

  //obtiene la lista de municipios de un departamento
  getMunicipios(idmuni:number)
  {
    let url: string= BE_API + '/municipio/?id='+idmuni;
    return this.http.get<municipioList>(url,httpOptions);
  }

  //Obtiene las propiedades por filtro de busqueda
  getFilteredProperties(myfilter:filtro)
  {
    let url: string = BE_API + '/property/filter';
    
    return this.http.post<propiedadList>(url, myfilter  , httpOptions);
  }

  //valida si un usuario ya existe
  existinguser(email:string)
  {
    let existsreq:userexist = new userexist(email);
    let url: string = BE_API + '/user/exists';
    return this.http.post<genericresp>(url, existsreq,httpOptions);
  }

  //obtiene mensajes
  getMessages(tipo:string, idlogin:number, id:number)
  {
    let url: string= BE_API + '/mensaje/?tipo=' + tipo + '&userid=' + idlogin + '&id='+id;
    return this.http.get<mensajeItemList>(url,httpOptions);
  }


  getMyProperties(userid:number)
  {
    let url: string= BE_API + '/propertybylogin/?userid=' + userid;
    return this.http.get<propiedadList>(url,httpOptions);
  }

  deleteProperty(id:number)
  {
    let url: string= BE_API + '/property/?id=' + id;
    return this.http.delete<genericresp>(url,httpOptions);
  }

  insertProperty(prop:propiedadItem)
  {
    let url: string= BE_API + '/property';
    return this.http.put<genericresp>(url,prop,httpOptions);
  }

  updateProperty(prop:propiedadItem)
  {
    let url: string= BE_API + '/property';
    return this.http.post<genericresp>(url,prop,httpOptions);
  }

  //agrega imagen a una propiedad
  insertImage(img:imagen)
  {
    let url: string= BE_API + '/image';
    return this.http.put<genericresp>(url,img,httpOptions);
  }

  //elimina imagen de una propiedad
  deleteImage(id:number)
  {
    let url: string= BE_API + '/image/?id=' + id;
    return this.http.delete<genericresp>(url,httpOptions);
  }


  //obtiene los archivos de un contrato
  getFiles(idcontrato:number)
  {
    let url: string= BE_API + '/contract/file/?idcontrato=' + idcontrato;
    return this.http.get<archivoList>(url,httpOptions);
  }

  //agrega archivo a un contrato
  insertFile(arch:archivo)
  {
    let url: string= BE_API + '/contract/file';
    return this.http.put<genericresp>(url,arch,httpOptions);
  }

  //elimina archivo de un contrato
  deleteFile(id:number)
  {
    let url: string= BE_API + '/contract/file/?id=' + id;
    return this.http.delete<genericresp>(url,httpOptions);
  }

  //obtiene contratos de un usuario
  getContracts(userid:number)
  {
    let url: string= BE_API + '/contractByUserId/?id=' + userid;
    return this.http.get<contractList>(url,httpOptions);
  }

  insertContract(contrato:contractItem)
  {
    let url: string= BE_API + '/contract';
    return this.http.put<genericresp>(url,contrato,httpOptions);
  }

  updateContract(contrato:contractItem)
  {
    let url: string= BE_API + '/contract';
    return this.http.post<genericresp>(url,contrato,httpOptions);
  }

  //obtiene los contactos de un usuario
  getContactos(userid:number)
  {
    let url: string= BE_API + '/contact/?idlogin=' + userid;
    return this.http.get<contactList>(url,httpOptions);
  }

  //creacion de contacto
  insertContact(pcont:contact)
  {
    let url: string= BE_API + '/contact';
    return this.http.put<genericresp>(url,pcont,httpOptions);
  }

  //actualizacion de contacto
  updateContact(pcont:contact)
  {
    let url: string= BE_API + '/contact';
    return this.http.post<genericresp>(url,pcont,httpOptions);
  }

  //registra una renovacion
  saveRenewal(idcontrato:number, monto:number, duracion:number, idlogin:number)
  {
    let pcont=new renewal(idcontrato, monto, duracion, idlogin);
    let url: string= BE_API + '/renovacion';
    return this.http.post<genericresp>(url,pcont,httpOptions);
  }


  //registra una renovacion
  saveIncrement(idcontrato:number, monto:number, duracion:number, idlogin:number)
  {
    let pcont=new renewal(idcontrato, monto, duracion, idlogin);
    let url: string= BE_API + '/incremento';
    return this.http.post<genericresp>(url,pcont,httpOptions);
  }

}
