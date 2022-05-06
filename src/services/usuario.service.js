const {Sequelize, sequelize} = require('./bd.service');
const  {UsuarioModel}  = require('../models/usuario.model');
const { QueryTypes } = require('sequelize');
const bodyParser = require('body-parser');

const listarUsuariosService = async (query, pageStart = 0, pageLimit = 10) => {
   
   const usuariosModelResults = await UsuarioModel.findAll({
    order: [
        ['usu_codigo', 'ASC']
    ]
   });
   
   const usuariosArray = new Array();
   for (let i = 0; i < usuariosModelResults.length; i++) {
       const usuariosResult = usuariosModelResults[i];
       usuariosArray.push(usuariosResult.dataValues);
   }
   return usuariosArray;
}





const getByIdUsuarioService = async (usu_codigo) => {
   //Buscar en la BD por codigo
   const usuarioModelResult = await UsuarioModel.findByPk(usu_codigo);
   if(usuarioModelResult){
       return usuarioModelResult.dataValues;
   }else{
       return null;
   }
   
}

const crearUsuarioService = async (data) => {
   //Guardar el data en la BD
   const usuarioModelResult = await UsuarioModel.create(data);
   if(usuarioModelResult){
       return usuarioModelResult.dataValues;
   }else{
       return null;
   }
}

const actualizarUsuarioService = async (id, data) => {
    //console.log('dataupdateee',id, data, 'dataupdateeefinnn');
   const usuarioModelCount = await UsuarioModel.update(data, {
                where: {
                     usu_codigo: id
                },
});

console.log('usuario model coutn',usuarioModelCount.datavalues);
       return usuarioModelCount.dataValues;    
}

const eliminarUsuarioService = async (usu_codigo) => {
   //eliminar el data en la BD
   const usuarioModelCount = await UsuarioModel.destroy({
             where: {
               usu_codigo
            }
});
   if(usuarioModelCount > 0){
       return true;
   }else{
       return false;
   }
   
}

module.exports = {
   listarUsuariosService,getByIdUsuarioService,crearUsuarioService, actualizarUsuarioService, eliminarUsuarioService
}