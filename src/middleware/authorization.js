const { sequelize } = require("../services/bd.service");

const authorization = async(req,res,next) => {
    const token = req.headers['authorization'];
    console.log(token);
    //CON EL TOKEN
    //PRIMERO VERIFICAR SI ESE TOKEN EXISTE EN LA BD
    console.log('Header Auth',req.headers);
    let usuariosResult = await sequelize.query(
        `SELECT usu_codigo, usu_email, token FROM usuarios WHERE token = :t`,
        {
          replacements: {
            t: token
          },
        }
      );
      usuariosResult = usuariosResult && usuariosResult[0] ? usuariosResult[0] : [];
      if (usuariosResult && usuariosResult.length > 0) {
        req.usuarioId = usuariosResult[0].usu_codigo;  
        next();
      }else{
          res.send({
              success: false,
              error: 'no se puedo autenticar'
          });
      }
}

module.exports = {
    authorization
};