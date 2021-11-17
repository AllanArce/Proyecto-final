//SERVICIO DE PROPIEDAD

//Amarramos con la databse.
const conn = require('../../config/database');
const utils = require('../../util/utils');

module.exports = (app) => 
{
    //Crear propiedad.
    app.put("/property", (req, res, next) => 
    {
        //variables del front/postman.
        
        var area_total = req.body.area_total;
        var direccion = utils.comillas(req.body.direccion);
        var numero_habitaciones = req.body.numero_habitaciones;
        var numero_banios = req.body.numero_banios;
        var parqueos = req.body.parqueos;
        var precio = req.body.precio;
        var arrendada = req.body.arrendada;
        var descripcion = utils.comillas(req.body.descripcion);
        var estatus = 1;
        var estatus_publicado = req.body.estatus_publicado;
        var nombre_propiedad = req.body.nombre_propiedad;
        var zona = req.body.zona;
        var idtipo = req.body.idtipo;
        var iddepto  = req.body. iddepto;
        var idmunicipio  = req.body. idmunicipio;
        var idlogin  = req.body. idlogin;
        var telefonos  = utils.comillas(req.body. telefonos);
        var email  = utils.comillas(req.body. email);
        var idimagen = req.body.idimagen;
        var fechapub ="null";
        if (estatus_publicado==2)
        {
            fechapub="now()";
        }

        //se hace el query de INSERT.
        var query ="INSERT INTO propiedad (area_total, direccion, numero_habitaciones, numero_banios, parqueos, precio, arrendada, idlogin, descripcion, estatus, estatus_publicado, nombre_propiedad, zona, idimagen, created, publicado, idtipo, iddepto, idmunicipio, telefonos, email) ";
        query= query +"VALUES ("+ area_total +", '"+ direccion +"', "+ numero_habitaciones+", "+ numero_banios+", "+ parqueos+", "+precio+", "+ arrendada+", "+idlogin+", '"+ descripcion+"', "+ estatus +", "+ estatus_publicado +", '"+nombre_propiedad+"', "+ zona +", "+idimagen+", now(), "+ fechapub +", "+ idtipo +", "+ iddepto +", "+ idmunicipio +", '"+ telefonos+"', '"+email+"');"
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Operacion ejecutada exitosamente."});                
            }
        });
    });

    //Modificar propiedad.
    app.post("/property", (req, res, next) => 
    {
        //variables del front/postman
        var area_total = req.body.area_total;
        var direccion = "'"+utils.comillas(req.body.direccion)+"'";
        var numero_habitaciones = req.body.numero_habitaciones;
        var numero_banios = req.body.numero_banios;
        var parqueos = req.body.parqueos;
        var precio = req.body.precio;
        var arrendada = req.body.arrendada;
        var descripcion = "'"+utils.comillas(req.body.descripcion)+"'";
        var estatus = 1;
        var estatus_publicado = req.body.estatus_publicado;
        var nombre_propiedad = "'"+utils.comillas(req.body.nombre_propiedad)+"'";
        var zona = req.body.zona;
        var idtipo = req.body.idtipo;
        var iddepto  = req.body. iddepto;
        var idmunicipio  = req.body.idmunicipio;
        var idpropiedad  = req.body.idpropiedad;
        var telefonos  = "'"+utils.comillas(req.body. telefonos)+"'";
        var email  = "'"+utils.comillas(req.body. email)+"'";
        var idimagen = req.body.idimagen;
        var fechapub ="null";
        if (estatus_publicado==2)
        {
            fechapub="now()";
        }

        //se hace el query de update.
        var query ="update propiedad set ";
        query = query + " area_total=" + area_total + ","  + "direccion=" + direccion + "," + "numero_habitaciones=" + numero_habitaciones + "," + "numero_banios=" + numero_banios + "," + "parqueos=" + parqueos + "," + "precio=" + precio + "," + "arrendada=" + arrendada + "," + "descripcion=" + descripcion + "," + "estatus=" + estatus + "," + "estatus_publicado=" + estatus_publicado + "," + "nombre_propiedad=" + nombre_propiedad + "," + "zona=" + zona + "," + "idimagen=" + idimagen + "," + "publicado=" + fechapub + "," + "idtipo=" + idtipo + "," + "iddepto=" + iddepto + "," + "idmunicipio=" + idmunicipio + "," + "telefonos=" + telefonos + "," + "email=" + email ;
        query = query + " where idpropiedad="+idpropiedad;
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos"});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Operacion ejecutada exitosamente."});
            }
        });
    });        

    //obtiene una propiedad por id
    app.get("/property", (req, res)=>
    {
        var idprop = req.query.id;
        let query="select * from TodasPropiedades where idpropiedad=" + idprop;
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , propiedades:rows});                  
            }
        });
    });

    //obtiene las propiedades de un propietario especifico
    app.get("/propertybylogin", (req, res)=>{

        var userid = req.query.userid;
        var query = "select * from TodasPropiedades where estatus=1 and idlogin="+userid;

        conn.query(query, (err, rows, cols) =>
         {
             if (err)
             {
             //entra si hay error en el query, tipo sintaxis.
             res.json({status:0,mensaje: "Error en la base de datos."});    
             }
             else
             {                                                 
             res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , propiedades:rows});                  
             }
         });

    });
      
    
     //Mostrar propiedades de busqueda
     app.post("/property/filter", (req, res, next) => 
     {
        //variable get.    
        var qry = "estatus_publicado=2";
        var iddep = req.body.iddep;
        var idmun = req.body.idmun;
        var zona = req.body.zona;
        var hab = req.body.hab;
        var minimo = req.body.minimo;
        var maximo = req.body.maximo;
        var palabra = utils.comillas(req.body.palabra);

        if (iddep!="0" && iddep!="")
        {
            qry = qry.concat(" and iddepto=", iddep);
        }

        if (idmun!="0" && idmun!="")
        {
            qry = qry.concat(" and idmunicipio=", idmun);
        }

        if (zona!="" && zona!=null)
        {
            qry = qry.concat(" and zona=", zona);
        }
        if (hab!="" && hab!=null)
        {
            qry = qry.concat(" and numero_habitaciones=", hab);
        }
        if (minimo!="" && minimo!=null)
        {
            qry = qry.concat(" and precio>=", minimo);
        }
        if (maximo!="" && maximo!=null)
        {
            qry = qry.concat(" and precio<=", maximo);
        }
        if (palabra!="" && palabra!=null)
        {
            qry = qry.concat(" and descripcion like '%", palabra,"%'");
        }
        
         //se hace el query de SELECT.
         let query = "select * from TodasPropiedades where "+qry;
         
         conn.query(query, (err, rows, cols) =>
         {
             if (err)
             {
             //entra si hay error en el query, tipo sintaxis.
             res.json({status:0,mensaje: "Error en la base de datos."});    
             }
             else
             {                                                 
             res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , propiedades:rows});                  
             }
         });
     });
     
     
    //Mostrar propiedades recientes.
    app.get("/property/getall", (req, res, next) => 
    {
        
        //leemos las propiedades publicadas recientemente
        let query="select * from PropiedadesRecientes";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , propiedades:rows});                  
            }
        });
    });

    //eliminar propiedad por id, se actualiza el estado
    app.delete("/property",(req, res)=>{
        var id = req.query.id;
        var query ="update propiedad set estatus=0, arrendada=0, estatus_publicado=0 where idpropiedad="+id;

        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la ejecución del comando."});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Operacion ejecutada exitosamente."});                
            }
        });
    });
}