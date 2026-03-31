const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Định nghĩa cấu trúc bảng Liên hệ
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true // Tự động thêm cột createdAt và updatedAt
});

module.exports = Contact;