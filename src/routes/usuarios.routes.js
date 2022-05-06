
const UsuarioController = require('../controllers/usuario.controller');

module.exports = (app) => {

    app.get('/usuario/list', UsuarioController.listarUsuariosController);
    app.get('/usuario/find/:id', UsuarioController.getByIdUsuarioController);
    app.post('/usuario/create', UsuarioController.crearUsuarioController);
    app.put('/usuario/update/:id', UsuarioController.actualizarUsuarioController);
    app.delete('/usuario/remove/:id', UsuarioController.eliminarUsuarioController);

}