export class guardarregistroresponse{
    status:number;
    mensaje:string;

    constructor(status: number, mensaje:string){
        this.mensaje=mensaje;
        this.status=status;
    }
}