const CategoriaController = require('../controllers/categoria.controller');

module.exports = (app) => {

    app.get('/categoria/list', CategoriaController.listarCategoriasController);
    app.get('/categoria-filter', CategoriaController.listFilterCategoriaController);
    app.get('/categoria/find/:id', CategoriaController.getByIdCategoriaController);
    app.post('/categoria/create', CategoriaController.crearCategoriaController);
    app.put('/categoria/update', CategoriaController.actualizarCategoriaController);
    app.delete('/categoria/remove/:id', CategoriaController.eliminarCategoriaController);

}