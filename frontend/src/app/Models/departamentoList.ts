import { departamento } from "./departamento";

export class departamentoList{
    status: number;
    mensaje: string;
    departamentos: Array<departamento>;

    constructor(status:number, mensaje:string, departamentos:Array<departamento>)
    {
        this.status=status;
        this.mensaje=mensaje;
        this.departamentos=departamentos;
    }
}