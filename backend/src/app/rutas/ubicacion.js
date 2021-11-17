//SERVICIO DE UBICACION DEPARTAMENTOS Y MUNICIPIOS

//Amarramos con la databse.
const conn = require('../../config/database');

module.exports = (app) => 
{
    //obtener departamento.
    app.get("/departamento", (req, res, next) => 
    {
        //se hace el query de SELECT.
        let query = "select id, nombre from departamento";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , departamentos :rows});                  
            }
            
        });
    }); 

    //obtener municipios.
    app.get("/municipio", (req, res, next) => 
    {
        var iddepto = req.query.id;
        //se hace el query de SELECT.
        let query = "select id, iddepto, nombre from municipio where iddepto="+iddepto;
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Operacion ejecutada exitosamente." , municipios :rows});                  
            }
            
        });
    });
}