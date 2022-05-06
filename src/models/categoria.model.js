const { DataTypes } = require('sequelize');
const {sequelize} = require('../services/bd.service');
const {EventoModel} = require('./evento.model.js');

const CategoriaModel = sequelize.define('Categoria', {
  // Model attributes are defined here
  ca_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ca_nombre: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'categorias',
  timestamps: false
});



module.exports = {
  CategoriaModel
};