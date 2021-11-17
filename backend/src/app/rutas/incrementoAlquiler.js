//SERVICIO DE INCREMENTO DE PROPIEDAD

//Amarramos con la databse.
const conn = require('../../config/database');

module.exports = (app) => 
{
    //Crear contacto.
    app.post("/increment/create", (req, res, next) => 
    {
        //variables del front/postman.
        var idcontrato = req.body.idcontrato;
        var fechaincremento = req.body.fechaincremento;
        var nuevomonto = req.body.nuevomonto;
        var comentario = req.body.comentario;
        var idlogin = req.body.idlogin;

        //se hace el query de INSERT.
        var dirtrabajo = req.body.workplace;
        let query = "INSERT INTO incremento_alquiler (`idcontrato`, `fecha_incremento`, `nuevo_monto`, `comentario`,`idlogin`) VALUES ('"+idcontrato+"', '"+fechaincremento+"', '"+nuevomonto+"', '"+comentario+"','"+idlogin+"')";
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

    //Modificar incremento.
    //PARA ELIMINAR UN INCREMENTO SE MODIFICA EL ESTATUS.
    app.post("/increment/update", (req, res, next) => 
    {
        //variables del front/postman
        var idcontrato = req.body.idcontrato;
        var fechaincremento = req.body.fechaincremento;
        var nuevomonto = req.body.nuevomonto;
        var comentario = req.body.comentario;
        var status = req.body.status;
        var idincrementoalquiler = req.body.idincrementoalquiler;

        //se hace el query de update.
        let query = "UPDATE incremento_alquiler SET `idcontrato`='"+idcontrato+"', `fecha_incremento`='"+fechaincremento+"', `nuevo_monto`='"+nuevomonto+"', `comentario`='"+comentario+"', `status`='"+status+"' WHERE `idincremento_alquiler`='"+idincrementoalquiler+"'";
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

    //Mostrar incrementos.
    app.get("/increment/get", (req, res, next) => 
    {
        //variables del front/postman.    
        var idlogin = req.body.idlogin;

        //se hace el query de SELECT.
        let query = "select idincremento_alquiler, idcontrato, fecha_incremento, nuevo_monto, comentario from incremento_alquiler where idlogin ="+idlogin+";";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , incrementos :rows});                  
            }
        });
    });        
}