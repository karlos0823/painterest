const express = require ('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid');
const {format} = require('timeago.js');
const exphbs = require ('express-handlebars');
const methodOverride = require('method-override');

//Inicializaciones
const app = express();

//Configuraciones
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname,'views'));
    
    //handlebars
    app.engine('.hbs', exphbs.engine({
        defaultLayout:'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',

        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }

    }));

    app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));


//Configuración para guardar las imeganes
const storage = multer.diskStorage({
    destination: path.join(__dirname, `public/img/uploads`),
    filename: (req, file, cb, filename) => {
        //con el path.name extraemos solo la extensión del archivo
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})
app.use(multer({storage: storage}).single('image'));

//Variables globales
app.use((req, res, next) =>{
    //creamos la función format
    app.locals.format = format;
    next();
});

//Rutas
app.use(require('./routes/index'));

//Archivos estáticos

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () => {

    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)

});
