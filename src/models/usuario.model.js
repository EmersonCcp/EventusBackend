const { DataTypes } = require('sequelize');
const {sequelize} = require('../services/bd.service');
const bcrypt = require('bcrypt');

const UsuarioModel = sequelize.define('Usuario', {
  // Model attributes are defined here
  usu_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  usu_nombre: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  usu_apellido: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  usu_email: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  usu_password: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  usu_fnac: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  usu_avatar: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'usuarios',
  timestamps: false
},{
  freezeTableName: true,
  instanceMethods: {
    generateHash(usu_password){
      return bcrypt.hash(usu_password, bcrypt.hashSync(8));
    },
    validPassword(usu_password){
      return bcrypt.compare(usu_password, this.usu_password);
    }
  }
});

module.exports = {
  UsuarioModel
};