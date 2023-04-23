const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    price:Sequelize.INTEGER
})

module.exports = Product;