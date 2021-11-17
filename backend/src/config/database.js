//configuracion de database.
const db = require("mysql");

const conn = db.createConnection
(
    {
        host: "db-proyecto-is-ccvi-cc.c13b40g6d1uh.us-east-1.rds.amazonaws.com",
        user: "masterAdmin",
        password: "master12345master",
        database: "proyecto_IS_CCVI_CC"
    }
);

conn.connect((error) => {
    if (error) {
        console.log("error de conexion BD.")
    }
    else
    {
        console.log("Conexion exitosa a BD.")
    }
});

module.exports = conn;