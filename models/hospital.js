const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });// Se renombra la tabla en la base de datos

// aqui se quitan los elementos que no se quiere hacer visibles y regresa MONGODB
HospitalSchema.method( 'toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );