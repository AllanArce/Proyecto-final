import { contractItem } from "./contractItem";

export class contractList{
    status: number;
    mensaje: string;
    contratos: Array<contractItem>;

    constructor(status:number, mensaje:string, contratos:Array<contractItem>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.contratos=contratos;
    }
}