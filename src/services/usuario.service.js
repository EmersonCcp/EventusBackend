const { Sequelize, sequelize } = require("./bd.service");
const { UsuarioModel } = require("../models/usuario.model");
const { QueryTypes } = require("sequelize");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const listarUsuariosService = async (query, pageStart = 0, pageLimit = 10) => {
  const usuariosModelResults = await UsuarioModel.findAll({
    order: [["usu_codigo", "ASC"]],
  });

  const usuariosArray = new Array();
  for (let i = 0; i < usuariosModelResults.length; i++) {
    const usuariosResult = usuariosModelResults[i];
    usuariosArray.push(usuariosResult.dataValues);
  }
  return usuariosArray;
};

const getByIdUsuarioService = async (usu_codigo) => {
  //Buscar en la BD por codigo
  const usuarioModelResult = await UsuarioModel.findByPk(usu_codigo);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const crearUsuarioService = async (data) => {
  //Guardar el data en la BD
  const usuarioModelResult = await UsuarioModel.create(data);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const actualizarUsuarioService = async (data) => {
 
  const usuarioModelCount = await UsuarioModel.update(data, {
    where: {
      usu_codigo: data.usu_codigo,
    },
  });

  if (usuarioModelCount > 0) {
    const usuarioModelResult = await UsuarioModel.findByPk(data.usu_codigo);
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const eliminarUsuarioService = async (usu_codigo) => {
  //eliminar el data en la BD
  const usuarioModelCount = await UsuarioModel.destroy({
    where: {
      usu_codigo,
    },
  });
  if (usuarioModelCount > 0) {
    return true;
  } else {
    return false;
  }
};

const loginUsuarioService = async (data) => {
  let usuariosResult = await sequelize.query(
    `SELECT usu_codigo, usu_email, token FROM usuarios WHERE usu_email = :e
                                            AND usu_password = :p LIMIT 1`,
    {
      replacements: {
        e: data.usu_email,
        p: data.usu_password,
      },
    }
  );

  usuariosResult = usuariosResult && usuariosResult[0] ? usuariosResult[0] : [];
  console.log("usuariosResult: ", usuariosResult);

  if (usuariosResult && usuariosResult.length > 0) {
    if (usuariosResult[0].token && usuariosResult[0].usu_codigo != "") {
      return {
        token: usuariosResult[0].token,
      };
    } else {
      const payload = {
        usu_email: data.usu_email,
        usu_codigo: usuariosResult[0].usu_codigo,
      };
      console.log("payload", payload);
      var token = jwt.sign(payload, "123456");
      let tokenUsuario = await sequelize.query(
        `UPDATE usuarios SET token = :t WHERE usu_codigo = :c`,
        {
          replacements: {
            t: token,
            c: usuariosResult[0].usu_codigo,
          },
        }
      );
      return {
        token,
      };
    }
  } else {
    throw new Error("Datos de usuario o password inválidos!");
  }
};

const logoutUsuarioService = async (usuarioId) => {
  
  let tokenUsuario = await sequelize.query(
    `UPDATE usuarios SET token = null WHERE usu_codigo = :c`,
    {
      replacements: {
        c: usuarioId,
      },
    }
  );
};

module.exports = {
  listarUsuariosService,
  getByIdUsuarioService,
  crearUsuarioService,
  actualizarUsuarioService,
  eliminarUsuarioService,
  loginUsuarioService,
  logoutUsuarioService,
};
