const { DataTypes } = require('sequelize');
const {sequelize} = require('../services/bd.service');


const EventoModel = sequelize.define('Evento', {
  // Model attributes are defined here
  eve_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  eve_nombre: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  eve_descripcion: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  eve_fecha: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  eve_tags: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  eve_ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  eve_estado: {
    type: DataTypes.STRING,
    allowNull:true
    // allowNull defaults to true
  },
  eve_entradas: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  eve_img: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  fk_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'eventos',
  timestamps: false
});



module.exports = {
  EventoModel
};