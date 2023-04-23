const Sequelize = require('sequelize');

const sequelize = new Sequelize('product-add','root','password',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;