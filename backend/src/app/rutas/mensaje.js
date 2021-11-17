const conn = require('../../config/database');
const utils = require('../../util/utils');


module.exports = (app) => 
{

    app.post("/mensaje", (req, res)=>{
        var id = req.body.id;
        let query ="update mensaje set leido=1 where id="+id;

        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
                res.json({status:0, mensaje: "Error al actualizar el mensaje."});    
            }
            else
            {                                
                res.json({status:1, mensaje: "Operación ejecutada exitosamente."});
            }
        });

    });

    //insertamos un nuevo mensaje
    app.put("/mensaje", (req, res)=>{

        var idlogin = req.body.id;
        var remitente = utils.comillas(req.body.remitente);
        var email = utils.comillas(req.body.email);
        var telefono = utils.comillas(req.body.telefono);
        var asunto = utils.comillas(req.body.asunto);
        var contenido = utils.comillas(req.body.contenido);
        var idpropiedad = req.body.idpropiedad;
        //variable de control para validaciones
        var continua=true;

        //validamos la informacion recibida desde el frontend
        if (idlogin==null || idlogin==undefined)
        {
            continua=false;
        }

        if (remitente==null || remitente==undefined || remitente.length==0)
        {
            continua=false;
        }

        if (email==null || email==undefined || email.length==0)
        {
            continua=false;
        }

        if (asunto==null || asunto==undefined || asunto.length==0)
        {
            asunto=false;
        }

        if (idpropiedad==null || idpropiedad==undefined)
        {
            continua=false;
        }

        if (contenido==null || contenido==undefined || contenido.length==0)
        {
            continua=false;
        }
        //fin validaciones

        if (telefono==null || telefono ==undefined)
        {
            telefono="";
        }

        if (continua==true)
        {
            //entra si la informacion esta correcta
            let query="insert into mensaje (idlogin, remitente, email, telefono, asunto, contenido, leido, idpropiedad) values (";
            query = query + idlogin +", '"+remitente+"', '"+email+"','"+telefono+"','"+asunto+"','"+contenido+"', 0, "+ idpropiedad+")";

            conn.query(query, (err, rows, cols) =>
            {
                if (err)
                {
                //entra si hay error en el query, tipo sintaxis.
                    res.json({status:0, mensaje: "Error al agregar el mensaje."});    
                }
                else
                {                                
                    res.json({status:1, mensaje: "Operación ejecutada exitosamente."});
                }
            });

        }
        else
        {
            res.json({status:0, mensaje:"Informacion incompleta."});
        }


    });

    

    //validar para obtener mensajes
    app.get("/mensaje", (req, res, next) => 
    {
        //parametros
        var tipo = req.query.tipo;
        var userid = req.query.userid;
        var id = req.query.id;
        
        

        let query="";
        
        if (tipo=="all")
        {
            query="select id, idlogin, remitente, email, telefono, asunto, contenido, date_format(fecha,'%d/%m/%y %T') as fecha, leido, idpropiedad from mensaje where idlogin="+userid+" order by fecha desc";
        }
        else
        {
            if (tipo=="unread")
            {
                query="select id, idlogin, remitente, email, telefono, asunto, contenido, date_format(fecha,'%d/%m/%y %T') as fecha, leido, idpropiedad from mensaje where idlogin="+userid+" and leido=0  order by fecha desc";
            }
            else
            {
                if (tipo=="one")
                {
                    query="select id, idlogin, remitente, email, telefono, asunto, contenido, date_format(fecha,'%d/%m/%y %T') asfecha, leido, idpropiedad from mensaje where idlogin="+userid+" and id=" + id ;    
                }
                else
                {
                    
                    res.json({status:0,mensaje:"Operacion incorrecta."});
                }
            }
        }

        if (query.length>0)
        {
            conn.query(query, (err, rows, cols) =>
            {
                if (err)
                {
                //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos."});    
                }
                else
                {                                                 
                res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , mensajes:rows});                  
                }
            });
        }
    });


}