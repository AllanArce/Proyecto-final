import { municipio } from "./municipio";

export class municipioList{
    status: number;
    mensaje: string;
    municipios: Array<municipio>;

    constructor(status:number, mensaje:string, municipios:Array<municipio>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.municipios=municipios;
    }
}