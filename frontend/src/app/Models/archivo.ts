export class archivo{
    idarchivo_contrato: number;
    idcontrato: number;
    url: string;
    anotacion: string;

    constructor(idarchivo_contrato:number, idcontrato:number, url:string, anotacion:string)
    {
        this.idarchivo_contrato=idarchivo_contrato;
        this.idcontrato = idcontrato;
        this.url = url;
        this.anotacion=anotacion;
    }
}