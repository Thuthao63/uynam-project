const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.STRING,
    comment: "Mã dịch vụ (VD: 01, 02)"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    comment: "Mô tả ngắn"
  },
  detail: {
    type: DataTypes.TEXT,
    comment: "Chi tiết dịch vụ"
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  features: {
    type: DataTypes.TEXT,
    comment: "Danh sách đặc điểm, lưu dưới dạng chuỗi phân cách bởi dấu phẩy"
  }
}, {
  timestamps: true
});

module.exports = Service;
