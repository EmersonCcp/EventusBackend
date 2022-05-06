const express = require('express');
const db = require('./src/services/bd.service.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//const fileUpload = require('express-fileupload');

//FileUpload
//app.use(fileUpload());
app.set('json spaces',2);
//app.use(express.json());


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());
require('./src/routes/eventos.routes')(app);
require('./src/routes/organizadores.routes')(app);
require('./src/routes/categorias.routes')(app);
require('./src/routes/usuarios.routes')(app);

app.listen(3000);