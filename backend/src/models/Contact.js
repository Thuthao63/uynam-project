const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Định nghĩa cấu trúc bảng Liên hệ (Bản cập nhật đầy đủ cột)
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
  phone: { // BẮT BUỘC PHẢI CÓ CỘT NÀY
    type: DataTypes.STRING(20),
    allowNull: false 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: { // THÊM CỘT NÀY ĐỂ LƯU "Nhà phố", "Biệt thự"...
    type: DataTypes.STRING,
    allowNull: true 
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true // Tự động quản lý createdAt và updatedAt
});

module.exports = Contact;