
const eventoController = require('../controllers/evento.controller');

module.exports = (app) => {

    app.get('/evento/list', eventoController.list);
    app.get('/evento/list-filter', eventoController.listFilter);
    app.get('/evento/find/:id', eventoController.getById);
    app.post('/evento/create', eventoController.create);
    app.put('/evento/update', eventoController.update);
    app.delete('/evento/remove/:id', eventoController.remove);

}