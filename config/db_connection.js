var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.\n');
    })
    .catch(err => {
        console.error('Unable to connect to the database:\n', err);
    });

var models = require('../models/index.js').init(sequelize)

module.exports = {
    sequelize,
    Traveler: models.Traveler,
    Trip: models.Trip
};