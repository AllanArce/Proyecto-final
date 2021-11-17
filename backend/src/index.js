//Amarramos con el server.
const app = require('./config/server');

//Mis rutas
require('./app/rutas/login')(app);
require('./app/rutas/usuario')(app);
require('./app/rutas/propiedad')(app);
require('./app/rutas/contacto')(app);
require('./app/rutas/contrato')(app);
require('./app/rutas/incrementoAlquiler')(app);
require('./app/rutas/renovacion')(app);
require('./app/rutas/cuentasCobrar')(app);
require('./app/rutas/imagen')(app);
require('./app/rutas/ubicacion')(app);
require('./app/rutas/mensaje')(app);


//Aplicacion escuchando en el puerto.
app.listen(app.get("PORT"), () => console.log(`Servidor corriendo en el puerto ${app.get("PORT")}`));
