class utils{

    static comillas(dato){

        if (dato==null || dato==undefined || dato.length==0){
            return dato;
        }
        else{
            return dato.replace(/'/g, '"');
        }

    }

}

module.exports = utils;