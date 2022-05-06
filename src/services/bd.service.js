const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('eventus', 'postgres', '9014', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  });

  const testConnection = async () =>{
     try {
    await sequelize.authenticate();
    await sequelize.sync({force: false});
    console.log('Se conectó correctamente');
  } catch (error) {
    console.error('No conectó', error);
  } 
  }
  testConnection();
  

  const db = {
      Sequelize,
      sequelize
  }

  module.exports = db;