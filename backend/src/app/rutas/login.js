const conn = require('../../config/database');
const utils = require('../../util/utils');

module.exports = (app) => 
{
    //validar si se loggea correctamente.
    app.post("/login", (req, res, next) => 
    {
        //variables del front
        var nombreusuario = utils.comillas(req.body.userna);
        var contrasenia = Buffer.from(req.body.contra).toString('base64');
        

        //1 si la autentificacion es correcta y 0 si la autentificacion falla.
        let query = "SELECT idlogin, nombre, COUNT(*) as resultado from login WHERE username='"+nombreusuario+"' AND password='"+contrasenia+"'";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
               res.json({status:999,mensaje: "Ocurrio un error al ejecutar la consulta"});   
            }
            else
            {
                
                //0 significa que no esta loggeado, mal password o username.
                //1 significa que esta loggeado correctamente.
                if (rows[0].resultado=="0")
                {
                    res.json({status:0,mensaje: "Usuario o password incorrecto."});  
                }
                else
                {
                    res.json({status:1, mensaje: "Login correcto.", userid: rows[0].idlogin, name:rows[0].nombre, token:"jwt-001" });  
                }
            }
        });
    });
}