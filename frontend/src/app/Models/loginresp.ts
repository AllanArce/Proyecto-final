export class loginresp{
    status: number;
    mensaje: string;
    userid: number;
    name: string;
    token: string;
    

    constructor(status:number, mensaje:string, userid:number, name:string, token:string){
        this.status = status;
        this.mensaje = mensaje;
        this.userid = userid;
        this.name = name;
        this.token = token;
        
    }

}