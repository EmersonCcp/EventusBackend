const { UsuarioModel } = require('../models/usuario.model');
const usuariosServices = require('../services/usuario.service');

const  listarUsuariosController = async (req,res) => {
    
    const usuarios = await usuariosServices.listarUsuariosService(req.query.q);
    res.send({
        usuarios
    });
}


const  getByIdUsuarioController = async (req,res) => {
    const usuario = await usuariosServices.getByIdUsuarioService(req.params.id);
    let jsonResultado = req.query;
    jsonResultado['success'] = true;
    jsonResultado['usuario'] = usuario;
    res.status(201).send(jsonResultado);
}

const   crearUsuarioController = async (req,res) => {
    const usuario = await usuariosServices.crearUsuarioService(req.body);
    res.status(202).send({
        success: true,
        usuario
    });
}

const   actualizarUsuarioController = async (req,res) => {
    const usuario = await usuariosServices.actualizarUsuarioService(req.body);
            res.status(202).send({
             success: true,
             usuario
         });
}

const   eliminarUsuarioController = async (req,res) => {
    const booleanValue = await usuariosServices.eliminarUsuarioService(req.params.id);
    res.status(202).send({
        success: booleanValue
    });
}

const   loginUsuarioController = async (req,res) => {
    try {
        const usuario = await usuariosServices.loginUsuarioService(req.body);
         res.status(200).send({
        success: true,
        token: usuario.token
    });   
    } catch (error) {
        res.status(200).send({
            success: false,
            error: error.message
        });   
    }
}

const   logoutUsuarioController = async (req,res) => {
    const usuario = await usuariosServices.logoutUsuarioService(req.usuarioId);
    res.status(202).send({
        success: true,
        usuario
    });
}

module.exports = {
    listarUsuariosController,
    getByIdUsuarioController,
     crearUsuarioController,
      actualizarUsuarioController,
       eliminarUsuarioController,
       loginUsuarioController,
       logoutUsuarioController
}