export class filtro{
    iddep: string;
    idmun: string;
    zona: string;
    hab: string;
    minimo: string;
    maximo: string;
    palabra: string;

    constructor(iddep: string, idmun: string, zona: string, hab: string, minimo: string, maximo: string, palabra: string)
    {
        this.iddep=iddep;
        this.idmun=idmun;
        this.zona=zona;
        this.hab=hab;
        this.minimo=minimo;
        this.maximo=maximo;
        this.palabra=palabra;
    }
}