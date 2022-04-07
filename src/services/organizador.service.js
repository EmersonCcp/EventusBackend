const {Sequelize, sequelize} = require('./bd.service');
const  {OrganizadorModel}  = require('../models/organizador.model');
const { QueryTypes } = require('sequelize');

const list = async (query, pageStart = 0, pageLimit = 10) => {
   
   const organizadoresModelResults = await OrganizadorModel.findAll();
   
   const organizadoresArray = new Array();
   for (let i = 0; i < organizadoresModelResults.length; i++) {
       const organizadoresResult = organizadoresModelResults[i];
       organizadoresArray.push(organizadoresResult.dataValues);
   }
   return organizadoresArray;
}

const listFilter = async (query, pageStart = 0, pageLimit = 10) => {
   
  // const videoModelResults = await VideoModel.findAll();
   let organizadoresResult = await sequelize.query(
    `SELECT * FROM organizadores WHERE (UPPER(org_nombre) LIKE :q
                                        OR UPPER(org_descripcion) LIKE :q)
                                        ORDER BY org_codigo`,
    {
        replacements: {
            q: query ? "%" + query.toUpperCase() + "%" : "%",
        },
    }
   );

   organizadoresResult = organizadoresResult && organizadoresResult[0] ? organizadoresResult[0] : [];
   return organizadoresResult;
}

const getById = async (org_codigo) => {
   //Buscar en la BD por codigo
   const organizadorModelResult = await OrganizadorModel.findByPk(org_codigo);
   if(organizadorModelResult){
       return organizadorModelResult.dataValues;
   }else{
       return null;
   }
   
}

const create = async (data) => {
   //Guardar el data en la BD
   const organizadorModelResult = await OrganizadorModel.create(data);
   if(organizadorModelResult){
       return organizadorModelResult.dataValues;
   }else{
       return null;
   }
}

const updateOrganizadorService = async (id, data) => {
    //console.log('dataupdateee',id, data, 'dataupdateeefinnn');
   const organizadorModelCount = await OrganizadorModel.update(data, {
                where: {
                     org_codigo: id
                },
});
/* 
const codigo = parseInt(id)

const {org_nombre, org_cargo, org_descripcion, org_foto} = data;

console.log(org_nombre, org_cargo, org_descripcion, org_foto);

let organizadoresResult = await sequelize.query(
    "UPDATE organizadores SET org_nombre = $1, org_cargo = $2, org_descripcion = $3, org_foto = $4 WHERE org_codigo = $5", [org_nombre, org_cargo, org_descripcion, org_foto, codigo]
) */
console.log('Organizadorr model coutn',organizadorModelCount.datavalues);
   //if(organizadorModelCount > 0){
       //const organizadorModelResult = await OrganizadorModel.findByPk(id);

       return organizadorModelCount.dataValues;
       
   //}else{
      // return null;
   //}
}

const remove = async (org_codigo) => {
   //eliminar el data en la BD
   const organizadorModelCount = await OrganizadorModel.destroy({
             where: {
                org_codigo
            }
});
   if(organizadorModelCount > 0){
       return true;
   }else{
       return false;
   }
   
}

module.exports = {
   list,listFilter, getById, create, updateOrganizadorService, remove
}