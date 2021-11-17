import { imagen } from "./imagen";

export class imagenList{
    status: number;
    mensaje: string;
    imagenes: Array<imagen>;

    constructor(status:number, mensaje:string, imagenes:Array<imagen>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.imagenes=imagenes;
    }
}