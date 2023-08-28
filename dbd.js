const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  userid: DataTypes.STRING,
  joindate: DataTypes.DATE,
  has_juul: DataTypes.BOOLEAN
});

const Settings = sequelize.define('Settings', {
    setting: DataTypes.STRING,
    value: DataTypes.STRING
});

module.exports = {
	User,
    Settings
}
