const CategoriaController = require('../controllers/categoria.controller');

module.exports = (app) => {

    app.get('/categoria/list', CategoriaController.list);
    app.get('/categoria-filter', CategoriaController.listFilter);
    app.get('/categoria/find/:id', CategoriaController.getById);
    app.post('/categoria/create', CategoriaController.create);
    app.put('/categoria/update/:id', CategoriaController.update);
    app.delete('/categoria/remove/:id', CategoriaController.remove);

}