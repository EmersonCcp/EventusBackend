const {sequelize} = require('./bd.service');
const  {CategoriaModel}  = require('../models/categoria.model');
const { QueryTypes } = require('sequelize');

const listarCategoriaService = async (query, pageStart = 0, pageLimit = 10) => {
   
    const categoriasModelResults = await CategoriaModel.findAll({
        order: [
            ['ca_codigo', 'ASC']
        ]
       });
    
    const categoriasArray = new Array();
    for (let i = 0; i < categoriasModelResults.length; i++) {
        const categoriasResult = categoriasModelResults[i];
        categoriasArray.push(categoriasResult.dataValues);
    }
    return categoriasArray;
 }

 const listFilterCategoriaService = async (query, pageStart = 0, pageLimit = 10) => {
   
     let categoriasResult = await sequelize.query(
      `SELECT * FROM categorias WHERE (UPPER(ca_nombre) LIKE :q)
                                          ORDER BY ca_codigo`,
      {
          replacements: {
              q: query ? "%" + query.toUpperCase() + "%" : "%",
          },
      }
     );
  
     categoriasResult = categoriasResult && categoriasResult[0] ? categoriasResult[0] : [];
     return categoriasResult;
  }

  const getByIdCategoriaService = async (ca_codigo) => {
    //Buscar en la BD por codigo
    const categoriaModelResult = await CategoriaModel.findByPk(ca_codigo);
    if(categoriaModelResult){
        return categoriaModelResult.dataValues;
    }else{
        return null;
    }
    
 }

 const crearCategoriaService = async (data) => {
    //Guardar el data en la BD
    const categoriaModelResult = await CategoriaModel.create(data);
    if(categoriaModelResult){
        return categoriaModelResult.dataValues;
    }else{
        return null;
    }
 }



const actualizarCategoriaService = async (data) => {
    const categoriaModelCount = await CategoriaModel.update(data, {
      where: {
        ca_codigo: data.ca_codigo,
      },
    });
  
    if (categoriaModelCount > 0) {
      const categoriaModelResult = await CategoriaModel.findByPk(data.ca_codigo);
      return categoriaModelResult.dataValues;
    } else {
      return null;
    }
  };


 const eliminarCategoriaService = async (ca_codigo) => {
    //eliminar el data en la BD
    const categoriaModelCount = await CategoriaModel.destroy({
              where: {
                 ca_codigo
             }
 });
    if(categoriaModelCount > 0){
        return true;
    }else{
        return false;
    }
    
 }

 module.exports = {
    listarCategoriaService, listFilterCategoriaService, getByIdCategoriaService,
    crearCategoriaService, actualizarCategoriaService, eliminarCategoriaService
 }