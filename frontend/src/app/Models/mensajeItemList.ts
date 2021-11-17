import { mensajeItem } from "./mensajeItem";

export class mensajeItemList{
    status: number;
    mensaje: string;
    mensajes: Array<mensajeItem>;

    constructor(status:number, mensaje:string, mensajes:Array<mensajeItem>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.mensajes=mensajes;
    }
}