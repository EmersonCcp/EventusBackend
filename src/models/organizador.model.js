const { DataTypes } = require('sequelize');
const {sequelize} = require('../services/bd.service');

const OrganizadorModel = sequelize.define('Organizador', {
  // Model attributes are defined here
  org_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  org_nombre: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  org_cargo: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  org_descripcion: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  org_foto: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  },
  org_whatsapp: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'organizadores',
  timestamps: false
});

module.exports = {
  OrganizadorModel
};