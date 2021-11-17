export class propiedadItem{
    idpropiedad:number;
    area_total:number;
    direccion:string;
    numero_habitaciones:number;
    numero_banios:number;
    parqueos: number;
    precio: number;
    arrendada: number; //0 si no esta arrendada 1 sisi
    descripcion: string;
    estatus: number; //0 si esta incativa 1 si esta activa
    estatus_publicado: number //0 si esta inactiva 2 si esta activa
    nombre_propiedad: string;
    departamento:string;
    municipio:string;
    zona:number;
    imagenurl:string;
    tipo:string;
    idtipo:number;
    iddepto:number;
    idmunicipio:number;
    idlogin:number;
    telefonos:string;
    email:string;
    idimagen:number;

    constructor(idpropiedad:number, area_total:number, direccion:string, numero_habitaciones:number, numero_banios:number, parqueos: number, precio: number, arrendada: number, descripcion: string, estatus: number,estatus_publicado: number, nombre_propiedad:string, departamento: string, municipio:string, zona: number , imagenurl:string, tipo:string, idtipo:number, iddepto:number, idmunicipio:number, idlogin:number, telefonos:string, email:string, idimagen:number)
    {
        this.idpropiedad=idpropiedad;
        this.area_total=area_total;
        this.direccion=direccion;
        this.numero_habitaciones=numero_habitaciones;
        this.numero_banios=numero_banios;
        this.parqueos=parqueos;
        this.precio=precio;
        this.arrendada=arrendada;
        this.descripcion=descripcion;
        this.estatus=estatus;
        this.estatus_publicado=estatus_publicado;
        this.nombre_propiedad=nombre_propiedad;
        this.departamento=departamento;
        this.zona=zona;
        this.imagenurl = imagenurl;
        this.tipo = tipo;
        this.idtipo=idtipo;
        this.municipio = municipio;
        this.iddepto = iddepto;
        this.idmunicipio = idmunicipio;
        this.idlogin = idlogin;
        this.telefonos = telefonos;
        this.email = email;
        this.idimagen=idimagen;
    }


     


}