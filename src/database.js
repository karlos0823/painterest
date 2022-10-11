const mongoose = require('mongoose');

const URI = process.env.MONGO_URY;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Base de datos conectada'))
.catch(error => console.log('Conexión a BD falló '+ error));