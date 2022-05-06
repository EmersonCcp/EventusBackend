const categoriaServices = require('../services/categoria.service');

const  listarCategoriasController = async (req,res) => {
    
    const categorias = await categoriaServices.listarCategoriaService(req.query.q);
    res.send({
        categorias
    });
}

const  listFilterCategoriaController = async (req,res) => {
    
    const categoria = await categoriaServices.listFilterCategoriaService(req.query.q);
    res.send({
        success:true,
         categoria});
}

const  getByIdCategoriaController = async (req,res) => {
    const categoria = await categoriaServices.getByIdCategoriaService(req.params.id);
    const jsonResultado = req.query;
    jsonResultado['success'] = true;
    jsonResultado['categoria'] = categoria;
    res.status(201).send(jsonResultado);
}

const   crearCategoriaController = async (req,res) => {
    const categoria = await categoriaServices.crearCategoriaService(req.body);
    res.status(202).send({
        success: true,
        categoria
    });
}

const actualizarCategoriaController = async (req, res) => {
    const actualizar = await categoriaServices.actualizarCategoriaService(req.body);
  
    res.status(202).send({
      success: true,
      actualizar,
    });
  };

const   eliminarCategoriaController = async (req,res) => {
    const booleanValue = await categoriaServices.eliminarCategoriaService(req.params.id);
    res.status(202).send({
        success: booleanValue
    });
}

module.exports = {
    listarCategoriasController, listFilterCategoriaController, getByIdCategoriaController,
    crearCategoriaController, actualizarCategoriaController, eliminarCategoriaController
}