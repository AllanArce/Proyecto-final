import { archivo } from "./archivo";

export class archivoList{
    status: number;
    mensaje: string;
    archivos: Array<archivo>;

    constructor(status:number, mensaje:string, archivos:Array<archivo>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.archivos=archivos;
    }
}