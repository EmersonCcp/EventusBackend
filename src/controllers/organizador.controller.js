const organizadorServices = require('../services/organizador.service');

const  list = async (req,res) => {
    
    const organizadores = await organizadorServices.list(req.query.q);
    res.send({
        organizadores
    });
}

const  listFilter = async (req,res) => {
    
    const organizador = await organizadorServices.listFilter(req.query.q);
    res.send({
        success:true,
         organizador});
}

    const  getById = async (req,res) => {
        const organizador = await organizadorServices.getById(req.params.id);
        let jsonResultado = req.query;
        jsonResultado['success'] = true;
        jsonResultado['organizador'] = organizador;
        res.status(201).send(jsonResultado);
    }

    const   create = async (req,res) => {
        const organizador = await organizadorServices.create(req.body);
        res.status(202).send({
            success: true,
            organizador
        });
    }

    const actualizarOrganizadorController = async (req, res) => {
        const actualizar = await organizadorServices.actualizarOrganizadorService(req.body);
      
        res.status(202).send({
          success: true,
          actualizar,
        });
      };

    const   remove = async (req,res) => {
        const booleanValue = await organizadorServices.remove(req.params.id);
        res.status(202).send({
            success: booleanValue
        });
    }

    module.exports = {
        list,create,
        listFilter,
        getById,
        actualizarOrganizadorController,remove
    }