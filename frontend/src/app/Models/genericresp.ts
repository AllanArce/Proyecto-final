export class genericresp
{
    status:number;
    mensaje:string;

    constructor(status:number, mensaje:string)
    {
        this.status = status;
        this.mensaje = mensaje;
    }


}