import { contact } from "./contact";

export class responsecontacts{

    status:number;
    mensaje:string;
    contactos: Array<contact>;

    constructor(status:number, mensaje:string, contactos:Array<contact>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.contactos=contactos;
    }

}