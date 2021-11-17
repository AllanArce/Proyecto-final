export class mensajeItem{
    id:number;
    idlogin:number;
    remitente:string;
    email:string;
    telefono:string;
    asunto:string;
    contenido:string;
    fecha:string;
    leido:number;
    idpropiedad:number;

    constructor(id:number, idlogin:number, remitente:string, email:string, telefono:string, asunto:string, contenido:string, fecha:string, leido:number, idpropiedad:number)
    {
        this.id= id;
        this.idlogin= idlogin;
        this.remitente= remitente;
        this.email= email;
        this.telefono= telefono;
        this.asunto= asunto;
        this.contenido= contenido;
        this.fecha= fecha;
        this.leido= leido;
        this.idpropiedad= idpropiedad;
    }
}