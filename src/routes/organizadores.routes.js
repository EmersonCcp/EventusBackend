
const OrganizadorController = require('../controllers/organizador.controller');

module.exports = (app) => {

    app.get('/organizador/list', OrganizadorController.list);
    app.get('/organizador-filter', OrganizadorController.listFilter);
    app.get('/organizador/find/:id', OrganizadorController.getById);
    app.post('/organizador/create', OrganizadorController.create);
    app.put('/organizador/update/:id', OrganizadorController.update);
    app.delete('/organizador/remove/:id', OrganizadorController.remove);

}