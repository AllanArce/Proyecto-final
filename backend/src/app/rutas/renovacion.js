//SERVICIO DE RENOVACION

//Amarramos con la databse.
const conn = require('../../config/database');

module.exports = (app) => 
{
    //Crear renovacion.
    app.post("/renew/create", (req, res, next) => 
    {
        //variables del front/postman.
        var idcontrato = req.body.idcontrato;
        var fecharenova = req.body.fecharenova;
        var monto = req.body.monto;
        var duracion = req.body.duracion;
        var comentario = req.body.comentario;
        var idlogin = req.body.idlogin;

        //se hace el query de INSERT.
        var dirtrabajo = req.body.workplace;
        let query = "INSERT INTO renovacion (`idcontrato`, `fecha_renovacion`, `monto`, `duracion_renovacion`, `comentario`, `idlogin`) VALUES ('"+idcontrato+"', '"+fecharenova+"', '"+monto+"', '"+duracion+"', '"+comentario+"', '"+idlogin+"')";
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

    //Modificar renovacion.
    //PARA ELIMINAR UNA RENOVACION SE MODIFICA EL ESTATUS.
    app.post("/renew/update", (req, res, next) => 
    {
        //variables del front/postman
        var idcontrato = req.body.idcontrato;
        var fecharenova = req.body.fecharenova;
        var monto = req.body.monto;
        var duracion = req.body.duracion;
        var comentario = req.body.comentario;
        var idrenovacion = req.body.idrenovacion;
        var status = req.body.status;

        //se hace el query de update.
        let query = "UPDATE renovacion SET `idcontrato`='"+idcontrato+"', `fecha_renovacion`='"+fecharenova+"', `monto`='"+monto+"', `duracion_renovacion`='"+duracion+"', `comentario`='"+comentario+"', `status`='"+status+"' WHERE `idrenovacion`='"+idrenovacion+"'";
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

    //Mostrar renovaciones.
    app.get("/renew/get", (req, res, next) => 
    {
        //variables del front/postman.    
        var idlogin = req.body.idlogin;

        //se hace el query de SELECT.
        let query = "select idrenovacion, idcontrato , fecha_renovacion, monto, duracion_renovacion, comentario, status from renovacion WHERE idlogin = "+idlogin+"";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , renovaciones :rows});                  
            }
        });
    });        
}