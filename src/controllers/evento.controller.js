
const eventoServices = require('../services/evento.service');

const  list = async (req,res) => {
    
    const eventos = await eventoServices.list(req.query.q);
    res.send({
        success: true,
        eventos
    });
}

const  listFilter = async (req,res) => {
    
    const eventos = await eventoServices.listFilter(req.query.q);
    res.send({
        success: true,
        eventos
    });
}

    const  getById = async (req,res) => {
        const evento = await eventoServices.getById(req.params.id);
        let jsonResultado = req.query;
        jsonResultado['success'] = true;
        jsonResultado['evento'] = evento;
        res.status(201).send(jsonResultado);
    }

    const   create = async (req,res) => {
        const evento = await eventoServices.create(req.body);
        res.status(202).send({
            success: true,
            evento
        });
    }

    const   update = async (req,res) => {
        const evento = await eventoServices.update(req.body);
        res.status(202).send({
            success: true,
            evento
        });
    }

    const   remove = async (req,res) => {
        const booleanValue = await eventoServices.remove(req.params.id);
        res.status(202).send({
            success: booleanValue
        });
    }

    module.exports = {
        list,
        listFilter,
        getById,
        create,
        update,remove
    }