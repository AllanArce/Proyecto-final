const conn = require('../../config/database');

module.exports = (app) => 
{
    //modificar datos del login.
    app.post("/user/update", (req, res, next) => 
    {
        //variables del front/postman
        var nombre = req.body.name;
        var contrasenia = Buffer.from(req.body.contra).toString('base64');
        var username = req.body.userna;


        //se hace el query de update.
        let query = "update login SET password = '"+contrasenia+"' , nombre = '"+nombre+"' WHERE username='"+username+"' ";
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

    //verifica si un usuaro ya existe.
    app.post("/user/exists", (req, res, next) => 
    {
        //variables del front/postman
        var username = req.body.userna;


        //se hace el query de update.
        let query = "select count(*) as conteo from  login  WHERE username='"+username+"' ";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
               res.json({status:999,mensaje: "Ocurrio un error al ejecutar la consulta"});   
            }
            else
            {
                //0 significa que no existe.
                //1 significa que si existe.
                if (rows[0].conteo=="0")
                {
                    res.json({status:0,mensaje: "Usuario no existe."});  
                }
                else
                {
                    res.json({status:1,mensaje: "Usuario ya existe.",myrows:rows});  
                }
            }
        });
    });


    //crear usuario
    app.post("/user/insert", (req, res, next) => 
    {
        //variables del front/postman
        var nombre = req.body.name;
        var contrasenia = Buffer.from(req.body.contra).toString('base64');
        var username = req.body.userna;


        //query con el insert
        let query = "INSERT INTO login (`password`, `username`, `nombre`) VALUES ('"+contrasenia+"', '"+username+"', '"+nombre+"')";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos"});    
            }
            else
            {                                
                
                res.json({status:1,mensaje: "Insercion ejecutada", tiendas:rows.rows});
                

            }
        });
    });
    
    
}