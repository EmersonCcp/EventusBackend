const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
//const upload = multer ({dest: 'uploads/'}); 


app.use(bodyParser());
//Routes del Caso de Uso

app.use(cors());
//require('./src/routes/eventos.routes')(app);
require('./src/routes/organizadores.routes')(app);
require('./src/routes/categorias.routes')(app);

app.listen(3000);