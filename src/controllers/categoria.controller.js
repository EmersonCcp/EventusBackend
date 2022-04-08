const categoriaServices = require('../services/categoria.service');

const  list = async (req,res) => {
    
    const categorias = await categoriaServices.list(req.query.q);
    res.send({
        categorias
    });
}

const  listFilter = async (req,res) => {
    
    const categoria = await categoriaServices.listFilter(req.query.q);
    res.send({
        success:true,
         categoria});
}

const  getById = async (req,res) => {
    const categoria = await categoriaServices.getById(req.params.id);
    let jsonResultado = req.query;
    jsonResultado['success'] = true;
    jsonResultado['categoria'] = categoria;
    res.status(201).send(jsonResultado);
}

const   create = async (req,res) => {
    const categoria = await categoriaServices.create(req.body);
    res.status(202).send({
        success: true,
        categoria
    });
}

const   update = async (req,res) => {
    const categoria = await categoriaServices.updateCategoriaService(req.params.id, req.body);
    console.log(req.params.id, req.body);
   
            res.status(202).send({
             success: true,
             categoria
         });
        
     
    
}

const   remove = async (req,res) => {
    const booleanValue = await categoriaServices.remove(req.params.id);
    res.status(202).send({
        success: booleanValue
    });
}

module.exports = {
    list,listFilter,getById, create, update, remove
}