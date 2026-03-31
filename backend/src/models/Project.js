const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Định nghĩa cấu trúc bảng Dự Án cho Uy Nam
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Tên công trình (VD: Nhà phố hiện đại)"
  },
  description: {
    type: DataTypes.TEXT,
    comment: "Mô tả chi tiết dự án"
  },
  imageUrl: {
    type: DataTypes.STRING,
    comment: "Đường dẫn ảnh đại diện công trình"
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "Nhà phố"
  }
}, {
  timestamps: true // Tự động thêm cột createdAt và updatedAt
});

module.exports = Project;