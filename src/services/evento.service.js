const {Sequelize, sequelize} = require('./bd.service');
const  {EventoModel}  = require('../models/evento.model');
const { QueryTypes } = require('sequelize');

const list = async (query, pageStart = 0, pageLimit = 10) => {
   
   const eventoModelResults = await EventoModel.findAll({
    order: [
        ['eve_codigo', 'ASC']
    ]
   });
   
   const eventosArray = new Array();
   for (let i = 0; i < eventoModelResults.length; i++) {
       const eventosResult = eventoModelResults[i];
       eventosArray.push(eventosResult.dataValues);
   }
   return eventosArray;
}

const listFilter = async (query, pageStart = 0, pageLimit = 10) => {
   
  // const videoModelResults = await VideoModel.findAll();
   let eventosResult = await sequelize.query(
    `SELECT * FROM eventos WHERE (UPPER(eve_nombre) LIKE :q)
                                        ORDER BY eve_codigo`,
    {
        replacements: {
            q: query ? "%" + query.toUpperCase() + "%" : "%",
        },
    }
   );

   eventosResult = (eventosResult && eventosResult[0]) ? eventosResult[0] : [];
   return eventosResult;
}

const getById = async (eve_codigo) => {
   //Buscar en la BD por codigo
   const eventoModelResult = await EventoModel.findByPk(eve_codigo);
   if(eventoModelResult){
       return eventoModelResult.dataValues;
   }else{
       return null;
   }
   
}

const create = async (data) => {
   //Guardar el data en la BD
   const eventoModelResult = await EventoModel.create(data);
   if(eventoModelResult){
       return eventoModelResult.dataValues;
   }else{
       return null;
   }
}

const update = async (data) => {
   const eventoModelCount = await EventoModel.update(data, {
                where: {
                     eve_codigo: data.eve_codigo
                },
});
   if(eventoModelCount > 0){
       const eventoModelResult = await EventoModel.findByPk(data.eve_codigo);
       return eventoModelResult.dataValues;
       
   }else{
       return null;
   }
}

const remove = async (eve_codigo) => {
   //eliminar el data en la BD
   const eventoModelCount = await EventoModel.destroy({
             where: {
                eve_codigo
            }
});
   if(eventoModelCount > 0){
       return true;
   }else{
       return false;
   }
   
}

module.exports = {
   list,listFilter, getById, create, update, remove
}