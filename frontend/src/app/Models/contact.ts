export class contact{
    idcontacto:number;
    nombre:string;
    apellido:string;
    telefono:string;
    correo_electronico:string;
    lugar_trabajo:string;
    direccion_lugar_trabajo:string;
    telefono_lugar_trabajo:string;
    numero_dpi:string;
    estatus:number;
    idlogin:number;

    constructor(idcontacto:number, nombre:string, apellido:string, telefono:string, correo_electronico:string, lugar_trabajo:string, direccion_lugar_trabajo:string,
        telefono_lugar_trabajo:string, numero_dpi:string, status:number, idlogin:number){
        this.idcontacto=idcontacto;
        this.nombre=nombre;
        this.apellido=apellido;
        this.telefono=telefono;
        this.correo_electronico=correo_electronico;
        this.lugar_trabajo=lugar_trabajo;
        this.direccion_lugar_trabajo=direccion_lugar_trabajo;
        this.telefono_lugar_trabajo=telefono_lugar_trabajo;
        this.numero_dpi=numero_dpi;
        this.estatus=status;
        this.idlogin=idlogin;
    }

    

}