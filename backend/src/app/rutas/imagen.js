//SERVICIO DE IMAGEN

//Amarramos con la databse.
const conn = require('../../config/database');
const utils = require('../../util/utils');

module.exports = (app) => 
{
    //Crear imagen.
    app.put("/image", (req, res, next) => 
    {
        //variables del front/postman.
        var idpropiedad = req.body.idpropiedad;
        var url = utils.comillas(req.body.url);
        var anotacion = utils.comillas(req.body.anotacion);
       

        //se hace el query de INSERT.
        let query = "INSERT INTO propiedad_imagen (`idpropiedad`, `url`, `anotacion`) VALUES ('"+idpropiedad+"', '"+url+"','"+anotacion+"')";
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

    //Eliminar imagen.
    app.delete("/image", (req, res, next) => 
    {
        //variables del front/postman.    
        var idimagen = req.query.id;

        //se hace el query de SELECT.
        let query = "DELETE FROM propiedad_imagen WHERE `idimagen`="+idimagen;
        console.log(query);
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." });                  
            }
        });
    });    
    
    //mostrar imagenes.
    app.get("/image", (req, res, next) => 
    {
        //variables del front/postman.    
        var idpropiedad = req.query.id;

        //se hace el query de SELECT.
        let query = "select idimagen, idpropiedad, url, anotacion from propiedad_imagen where idpropiedad="+idpropiedad+"";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , imagenes :rows});                  
            }
            
        });
    });   
}