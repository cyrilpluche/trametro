/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Trip', {
        tripId: {
            type: DataTypes.INTEGER,
            field: 'trip_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        stationCode: {
            type: DataTypes.STRING(250),
            field: 'station_code',
            allowNull: true
        },
        stationName: {
            type: DataTypes.STRING(250),
            field: 'station_name',
            allowNull: true
        },
        ligneCode: {
            type: DataTypes.STRING(250),
            field: 'ligne_code',
            allowNull: true
        },
        directionCode: {
            type: DataTypes.STRING(250),
            field: 'direction_code',
            allowNull: true
        },
        directionName: {
            type: DataTypes.STRING(250),
            field: 'direction_name',
            allowNull: true
        },
        travelerId: {
            type: DataTypes.STRING(500),
            field: 'traveler_id',
            allowNull: false,
            references: {
                model: 'traveler',
                key: 'traveler_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'trip',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Trip = model.Trip;
    const Traveler = model.Traveler;

    Trip.belongsTo(Traveler, {
        as: 'Traveler',
        foreignKey: 'traveler_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
