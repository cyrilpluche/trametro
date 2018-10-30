/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Traveler', {
        travelerId: {
            type: DataTypes.STRING(500),
            field: 'traveler_id',
            allowNull: false,
            primaryKey: true
        },
        travelerName: {
            type: DataTypes.STRING(250),
            field: 'traveler_name',
            allowNull: true
        },
        tripFavorite: {
            type: DataTypes.STRING(250),
            field: 'trip_favorite',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'traveler',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Traveler = model.Traveler;
    const Trip = model.Trip;

    Traveler.hasMany(Trip, {
        as: 'TripTravelerFks',
        foreignKey: 'traveler_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
