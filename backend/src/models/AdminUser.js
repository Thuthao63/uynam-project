const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AdminUser = sequelize.define('AdminUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true // Không cho phép để trống username
    }
  },
  passwordHash: {
    type: DataTypes.TEXT, // Dùng TEXT cho thoải mái độ dài hash sha512
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'admin_users',
  timestamps: true // Tự động thêm createdAt và updatedAt, rất tốt để quản lý
});

module.exports = AdminUser;