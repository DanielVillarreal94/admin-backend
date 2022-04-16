const mongoose = require('mongoose');

const dbConection = async () => {

    try {
        
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,  
        });
        console.log('DB online')

    } catch (error) {
        console.error(error);
        throw new Error('Erro al conectarce a la DB ver logs');
    }
}

module.exports = {
    dbConection
}