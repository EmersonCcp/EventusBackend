
const UsuarioController = require('../controllers/usuario.controller');
const authorizationMiddleware = require('../../src/middleware/authorization');

module.exports = (app) => {

    app.get('/usuario/list', UsuarioController.listarUsuariosController);
    app.get('/usuario/find/:id', UsuarioController.getByIdUsuarioController);
    app.post('/usuario/create', UsuarioController.crearUsuarioController);
    app.put('/usuario/update', UsuarioController.actualizarUsuarioController);
    app.delete('/usuario/remove/:id', UsuarioController.eliminarUsuarioController);

    app.post('/usuario/login', UsuarioController.loginUsuarioController);
    app.post('/usuario/logout',authorizationMiddleware.authorization , UsuarioController.logoutUsuarioController);

}