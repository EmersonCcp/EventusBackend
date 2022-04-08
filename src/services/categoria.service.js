const {Sequelize, sequelize} = require('./bd.service');
const  {CategoriaModel}  = require('../models/categoria.model');
const { QueryTypes } = require('sequelize');

const list = async (query, pageStart = 0, pageLimit = 10) => {
   
    const categoriasModelResults = await CategoriaModel.findAll();
    
    const categoriasArray = new Array();
    for (let i = 0; i < categoriasModelResults.length; i++) {
        const categoriasResult = categoriasModelResults[i];
        categoriasArray.push(categoriasResult.dataValues);
    }
    return categoriasArray;
 }

 const listFilter = async (query, pageStart = 0, pageLimit = 10) => {
   
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

  const getById = async (ca_codigo) => {
    //Buscar en la BD por codigo
    const categoriaModelResult = await CategoriaModel.findByPk(ca_codigo);
    if(categoriaModelResult){
        return categoriaModelResult.dataValues;
    }else{
        return null;
    }
    
 }

 const create = async (data) => {
    //Guardar el data en la BD
    const categoriaModelResult = await CategoriaModel.create(data);
    if(categoriaModelResult){
        return categoriaModelResult.dataValues;
    }else{
        return null;
    }
 }

 const updateCategoriaService = async (id, data) => {
    //console.log('dataupdateee',id, data, 'dataupdateeefinnn');
   const categoriaModelCount = await CategoriaModel.update(data, {
                where: {
                     ca_codigo: id
                },
});

console.log('Organizadorr model coutn',categoriaModelCount.datavalues);
       return categoriaModelCount.dataValues;    
}

 const remove = async (ca_codigo) => {
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
    list, listFilter, getById, create, updateCategoriaService, remove
 }