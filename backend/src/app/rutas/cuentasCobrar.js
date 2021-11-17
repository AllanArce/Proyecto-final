//SERVICIO DE CUENTAS COBRAR

//Amarramos con la databse.
const conn = require('../../config/database');

module.exports = (app) => 
{
    //Crear cuentas por cobrar.
    app.post("/account/create", (req, res, next) => 
    {
        //variables del front/postman.
        var idcontrato = req.body.idcontrato;
        var cargo = req.body.cargo;
        var abono = req.body.abono;
        var numdoc = req.body.numdoc;
        var saldo = req.body.saldo;
        var fechaoperacion = req.body.fechaoperacion;
        var tipo = req.body.tipo;
        var idlogin = req.body.idlogin;

        //se hace el query de INSERT.
        var dirtrabajo = req.body.workplace;
        let query = "INSERT INTO cuentas_cobrar (`idcontrato`, `cargo`,`abono`, `numero_documento`, `saldo`, `fecha_operacion`, `tipo`, `idlogin`) VALUES ('"+idcontrato+"', '"+cargo+"','"+abono+"', '"+numdoc+"', '"+saldo+"', '"+fechaoperacion+"', '"+tipo+"','"+idlogin+"')";
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

    //Modificar cuenta por cobrar.
    //PARA ELIMINAR UNA CUENTA POR COBRAR SE MODIFICA EL ESTATUS.
    app.post("/account/update", (req, res, next) => 
    {
        //variables del front/postman
        var idcontrato = req.body.idcontrato;
        var cargo = req.body.cargo;
        var abono = req.body.abono;
        var numdoc = req.body.numdoc;
        var saldo = req.body.saldo;
        var fechaoperacion = req.body.fechaoperacion;
        var tipo = req.body.tipo;
        var status = req.body.status;
        var idcuentascobrar = req.body.idcuentascobrar;

        //se hace el query de update.
        let query = "UPDATE cuentas_cobrar SET `idcontrato`='"+idcontrato+"', `cargo`='"+cargo+"', `abono`='"+abono+"', `numero_documento`='"+numdoc+"', `saldo`='"+saldo+"', `fecha_operacion`='"+fechaoperacion+"', `tipo`='"+tipo+"', `status`='"+status+"' WHERE `idcuentas_cobrar`='"+idcuentascobrar+"'";
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

    //Mostrar cuentas por cobrar.
    app.get("/account/get", (req, res, next) => 
    {
        //variables del front/postman.    
        var idlogin = req.body.idlogin;

        //se hace el query de SELECT.
        let query = "select idcuentas_cobrar, idcontrato, cargo, abono, numero_documento, saldo,fecha_operacion,tipo from cuentas_cobrar WHERE idlogin = "+idlogin+"";
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , Cuentas :rows});                  
            }
        });
    });        
}