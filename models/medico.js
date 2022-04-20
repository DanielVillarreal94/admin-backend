const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    //Se hace referencia a otro modelo de la base de datos 'hospitalesdb' en MONGODB
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    
});

// aqui se quitan los elementos que no se quiere hacer visibles y regresa MONGODB
MedicoSchema.method( 'toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Medico', MedicoSchema );