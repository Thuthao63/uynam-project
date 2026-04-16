const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AdminUser = sequelize.define('AdminUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'admin_users',
  timestamps: true
});

module.exports = AdminUser;
