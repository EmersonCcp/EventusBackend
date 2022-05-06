const multer = require('multer');
const fs = require("fs");

/* const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'upload/')
    },
    filename: function(req,file,cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}); */

const PATH = 'upload/';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({
  storage: storage
});

const OrganizadorController = require('../controllers/organizador.controller');


module.exports = (app) => {

    app.get('/organizador/list', OrganizadorController.list);
    app.get('/organizador-filter', OrganizadorController.listFilter);
    app.get('/organizador/find/:id', OrganizadorController.getById);
    app.post('/organizador/create', OrganizadorController.create);
    
    //PARA GUARDAR LA IMAGEN DE AVATAR
    app.post('/avatar',upload.single('org_foto'), (req,res) => {
        const file = req.file;
        //return req.file.filename = 123;
        console.log(file);
        if (file) {
            res.send(file);
            
        }else {
            console.log("Archivo no disponible!");
          return res.send({
            err,
            success: false
          });
        }
    } );

    //POST IMAGE METHOD
    app.post('/organizador/uploads', upload.single('image'), function (req, res) {
        if (!req.file) {
            err = req.file;
          console.log("Archivo no disponible!");
          return res.send({
            err,
            success: false
          });
        } else {
          console.log('Archivo cargado correctamente!');
          //console.log('cargadoooo',req.file, req.body);
          const fileInfo = req.file.path;
          const base64str = (fs.readFileSync(req.file.path, 'base64'));

          console.log(req.file.path);
          return res.send({
            success: true
          })
        }
      });


       
    //-----------------------------------------------------
    app.put('/organizador/update', OrganizadorController.actualizarOrganizadorController);
    app.delete('/organizador/remove/:id', OrganizadorController.remove);

}