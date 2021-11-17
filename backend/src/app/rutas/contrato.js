//SERVICIO DE CONTRATO

//Amarramos con la databse.
const conn = require('../../config/database');
const utils= require("../../util/utils");

module.exports = (app) => 
{
    //Crear contrato.
    app.put("/contract", (req, res, next) => 
    {
        //variables del front/postman.
        var idcontacto_fiador = req.body.idcontacto_fiador;
        var idpropiedad = req.body.idpropiedad;
        var fechainicio = req.body.fecha_inicio;
        var fechafinal = req.body.fecha_fin;
        var abogado = utils.comillas(req.body.abogado);
        var idcontacto_inquilino = req.body.idcontacto_inquilino;
        var precioinicio = req.body.precio_inicio;
        var duracioncontrato = req.body.duracion_contrato;
        var preciocontra = req.body.precio_contrato;
        var estado = req.body.estado;  
        var deposito = req.body.deposito;     
        var idlogin = req.body.idlogin;

        //se hace el query de INSERT.
        var dirtrabajo = req.body.workplace;
        let query = "INSERT INTO contrato (`idcontacto_fiador`, `idpropiedad`, `fecha_inicio`, `fecha_fin`, `abogado`, `idcontacto_inquilino`, `precio_inicio`, `duracion_contrato`, `precio_contrato`, `estado`, `deposito`, `idlogin`) VALUES ('"+idcontacto_fiador+"', '"+idpropiedad+"', '"+fechainicio+"', '"+fechafinal+"', '"+abogado+"', '"+idcontacto_inquilino+"', '"+precioinicio+"', '"+duracioncontrato+"', '"+preciocontra+"', '"+estado+"', '"+deposito+"', '"+idlogin+"')";
        
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
               //entra si hay error en el query, tipo sintaxis.
                res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                
                res.json({status:1,mensaje: "Insertado correctamente."});                
            }
        });
    });

    //Modificar contract.
    //PARA ELIMINAR UN CONTRATO SE MODIFICA EL ESTATUS.
    app.post("/contract", (req, res, next) => 
    {
        //variables del front/postman
        var idcontacto_fiador = req.body.idcontacto_fiador;
        var idpropiedad = req.body.idpropiedad;
        var fechainicio = req.body.fecha_inicio;
        var fechafinal = req.body.fecha_fin;
        var abogado = req.body.abogado;
        var idcontacto_inquilino = req.body.idcontacto_inquilino;
        var precioinicio = req.body.precio_inicio;
        var duracioncontrato = req.body.duracion_contrato;
        var preciocontra = req.body.precio_contrato;
        var estado = req.body.estado;  
        var deposito = req.body.deposito;     
        var estatus = req.body.estatus;
        var idcontrato = req.body.idcontrato;

        //se hace el query de update.
        let query = "UPDATE contrato SET `idcontacto_fiador`='"+idcontacto_fiador+"', `idpropiedad`='"+idpropiedad+"', `fecha_inicio`='"+fechainicio+"', `fecha_fin`='"+fechafinal+"', `abogado`='"+abogado+"', `idcontacto_inquilino`='"+idcontacto_inquilino+"', `precio_inicio`='"+precioinicio+"', `duracion_contrato`='"+duracioncontrato+"', `precio_contrato`='"+preciocontra+"', `estado`='"+estado+"', `deposito`='"+deposito+"', `estatus`='"+estatus+"' WHERE `idcontrato`='"+idcontrato+"'";
        
        
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

    //Mostrar contrato.
    app.get("/contractByUserId", (req, res, next) => 
    {
        //variables del front/postman.    
        var idlogin = req.query.id;

        //se hace el query de SELECT.
        //let query = "select idcontrato,idcontacto_fiador, idpropiedad, fecha_inicio, fecha_fin, abogado, idcontacto_inquilino, precio_inicio, duracion_contrato, precio_contrato, estado, deposito from contrato WHERE idlogin="+idlogin+"";
        var query = "select * from TodosContratos where estatus=1 and idlogin="+idlogin
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , contratos:rows});                  
            }
        });
    });    
    
    app.get("/contract/file", (req, res, next)=>{

        var id = req.query.idcontrato;
        var query = "select * from contrato_archivo where idcontrato="+id;
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
            res.json({status:1,mensaje: "Select ejecutado." , archivos:rows});                  
            }
        });

    });

    app.put("/contract/file",(req, res, next)=>{

        var idcontrato = req.body.idcontrato;
        var url = utils.comillas(req.body.url);
        var anotacion = utils.comillas(req.body.anotacion);

        var query = "insert into contrato_archivo (idcontrato, url, anotacion) values (";
        query = query + idcontrato+",'"+url+"','"+anotacion+"')";
        
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

    app.delete("/contract/file",(req,res, next)=>{
        var id = req.query.id;
        var query = "delete from contrato_archivo where idcontrato_archivo="+id;
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


    app.post("/renovacion",(req, res, next)=>{
        var idcontrato=req.body.idcontrato;
        var monto=req.body.monto;
        var duracion=req.body.duracion;
        var idlogin=req.body.idlogin;

        var query="insert into renovacion (idcontrato, fecha_renovacion, monto, duracion_renovacion, comentario, idlogin, status) ";
        query= query +" values ("+idcontrato+",now(),"+monto+","+ duracion+",'Renovacion',"+idlogin+", 1)";
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
                var query2 ="update contrato set precio_contrato="+monto+", fecha_fin= DATE_ADD(fecha_fin, INTERVAL " + duracion +" MONTH) where idcontrato="+idcontrato;
                
                conn.query(query2, (err, rows, cols) =>
                {
                    if (err)
                    {
                        res.json({status:0,mensaje: "Error en la base de datos."});    
                    }
                    else
                    {
                        res.json({status:1,mensaje: "Operacion realizada exitosamente."});    
                    }
                });
            }
        });


    });


    app.post("/incremento",(req, res, next)=>{
        var idcontrato=req.body.idcontrato;
        var monto=req.body.monto;
        var idlogin=req.body.idlogin;

        var query="insert into incremento_alquiler (idcontrato, fecha_incremento, nuevo_monto,  comentario, idlogin, status) ";
        query= query +" values ("+idcontrato+",now(),"+monto+",'Incremento',"+idlogin+", 1)";
        
        conn.query(query, (err, rows, cols) =>
        {
            if (err)
            {
            //entra si hay error en el query, tipo sintaxis.
            res.json({status:0,mensaje: "Error en la base de datos."});    
            }
            else
            {                                                 
                var query2 ="update contrato set precio_contrato="+monto+" where idcontrato="+idcontrato;
                
                conn.query(query2, (err, rows, cols) =>
                {
                    if (err)
                    {
                        res.json({status:0,mensaje: "Error en la base de datos."});    
                    }
                    else
                    {
                        res.json({status:1,mensaje: "Operacion realizada exitosamente."});    
                    }
                });
            }
        });


    });

}