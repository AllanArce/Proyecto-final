//SERVICIO DE PROPIEDAD

//Amarramos con la databse.
const conn = require('../../config/database');
const utils= require('../../util/utils');

module.exports = (app) => 
{
    //Crear contacto.
    app.put("/contact", (req, res, next) => 
    {
        //variables del front/postman.
        var nombre = utils.comillas(req.body.nombre);
        var apellido = utils.comillas(req.body.apellido);
        var telefono = utils.comillas(req.body.telefono);
        var correo = utils.comillas(req.body.correo_electronico);
        var dirtrabajo = utils.comillas(req.body.lugar_trabajo);
        var nombretrabajo = utils.comillas(req.body.direccion_lugar_trabajo);
        var teltrabajo = utils.comillas(req.body.telefono_lugar_trabajo);
        var dpi = utils.comillas(req.body.numero_dpi);
        var idlogin = req.body.idlogin;
        var estatus = req.body.estatus;

        //se hace el query de INSERT.
        var dirtrabajo = req.body.workplace;
        let query = "INSERT INTO contacto (`nombre`, `apellido`, `telefono`, `correo_electronico`, `lugar_trabajo`, `direccion_lugar_trabajo`, `telefono_lugar_trabajo`, `numero_dpi`,`idlogin`, `estatus`) VALUES ('"+nombre+"', '"+apellido+"', '"+telefono+"', '"+correo+"', '"+nombretrabajo+"', '"+dirtrabajo+"', '"+teltrabajo+"', '"+dpi+"','"+idlogin+"', "+estatus+")";
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Insertada correctamente."});                
            }
        });
    });

    //Modificar contacto.
    //PARA ELIMINAR UNA PROPIEDAD SE MODIFICA EL ESTATUS.
    app.post("/contact", (req, res, next) => 
    {
        //variables del front/postman
        var nombre = utils.comillas(req.body.nombre);
        var apellido = utils.comillas(req.body.apellido);
        var telefono = utils.comillas(req.body.telefono);
        var correo = utils.comillas(req.body.correo_electronico);
        var dirtrabajo = utils.comillas(req.body.direccion_lugar_trabajo);
        var nombretrabajo = utils.comillas(req.body.lugar_trabajo);
        var teltrabajo = utils.comillas(req.body.telefono_lugar_trabajo);
        var dpi = utils.comillas(req.body.numero_dpi);
        var estatus = req.body.estatus;
        var idcontacto = req.body.idcontacto;
        //se hace el query de update.
        let query = "UPDATE contacto SET `nombre`='"+nombre+"', `apellido`='"+apellido+"', `telefono`='"+telefono+"', `correo_electronico`='"+correo+"', `lugar_trabajo`='"+nombretrabajo+"', `direccion_lugar_trabajo`='"+dirtrabajo+"', `telefono_lugar_trabajo`='"+teltrabajo+"', `numero_dpi`='"+dpi+"', `estatus`='"+estatus+"' WHERE `idcontacto`='"+idcontacto+"'";
    
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos"});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Actualizacion ejecutada"});
            }
        });
    });        

    //Mostrar contactos.
    app.get("/contact", (req, res, next) => 
    {
        //variables del front/postman.    
        var idlogin = req.query.idlogin;

        //se hace el query de SELECT.
        let query = "select idcontacto, nombre, apellido, telefono, correo_electronico, lugar_trabajo, direccion_lugar_trabajo, telefono_lugar_trabajo, numero_dpi, estatus, idlogin  from contacto WHERE estatus=1 and idlogin="+idlogin+"";
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , contactos :rows});                  
            }
        });
    });        
}