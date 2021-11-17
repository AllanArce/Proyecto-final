export class imagen{
    idimagen: number;
    idpropiedad: number;
    url: string;
    anotacion: string;

    constructor(idimagen:number, idpropiedad:number, url:string, anotacion:string)
    {
        this.idimagen=idimagen;
        this.idpropiedad = idpropiedad;
        this.url = url;
        this.anotacion=anotacion;
    }
}