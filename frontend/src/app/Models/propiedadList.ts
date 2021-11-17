import { propiedadItem } from "./propiedadItem";

export class propiedadList{
    status: number;
    mensaje: String;
    propiedades: Array<propiedadItem>;

    constructor(status: number, mensaje:string, propiedades: Array<propiedadItem>){
        this.status= status;
        this.mensaje=mensaje;
        this.propiedades=propiedades;
    }
}