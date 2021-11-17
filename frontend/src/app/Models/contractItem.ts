export class contractItem
{
    idcontrato:number;
    idcontacto_fiador:number;
    idpropiedad:number;
    fecha_inicio:string;
    fecha_fin:string;
    abogado:string;
    idcontacto_inquilino:number;
    precio_inicio:number;
    duracion_contrato:number;
    precio_contrato:number;
    estado:number;
    deposito:number;
    estatus:number;
    idlogin:number;
    inquilino:string;
    fiador:string;
    nombre_propiedad:string;
    descestado:string;

    constructor(idcontrato:number, idcontacto_fiador:number, idpropiedad:number, fecha_inicio:string, fecha_fin:string, abogado:string, idcontacto_inquilino:number, precio_inicio:number, duracion_contrato:number, precio_contrato:number, estado:number, deposito:number, estatus:number, idlogin:number, inquilino:string, fiador:string, nombre_propiedad:string, descestado:string)
    {
        this.idcontrato           = idcontrato;
        this.idcontacto_fiador    = idcontacto_fiador;
        this.idpropiedad          = idpropiedad;
        this.fecha_inicio         = fecha_inicio;
        this.fecha_fin            = fecha_fin;
        this.abogado              = abogado;
        this.idcontacto_inquilino = idcontacto_inquilino;
        this.precio_inicio        = precio_inicio;
        this.duracion_contrato    = duracion_contrato;
        this.precio_contrato      = precio_contrato;
        this.estado               = estado;
        this.deposito             = deposito;
        this.estatus              = estatus;
        this.idlogin              = idlogin;
        this.inquilino            = inquilino;
        this.fiador               = fiador;
        this.nombre_propiedad     = nombre_propiedad;
        this.descestado = descestado;
    }
}