const { Sequelize, DataTypes } = require('sequelize');
const path = require("path");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dbs'
});

const User = sequelize.define('User', {
  userid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  joindate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now()
  },
  lastleavedate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  has_juul: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  juicetokens: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  account_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "GOOD"
  },
});

const Settings = sequelize.define('Settings', {
  setting: DataTypes.STRING,
  value: DataTypes.STRING
});

sequelize.sync()


Settings.create({
  setting: "juul_hits",
  value: "0"
})

module.exports = {
  sequelize,
  User,
  Settings
}
