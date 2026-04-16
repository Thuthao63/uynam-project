const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING,
    comment: "Tên hiển thị hoặc link ảnh logo"
  },
  imageUrl: {
    type: DataTypes.STRING,
    comment: "Đường dẫn ảnh logo thực tế"
  }
}, {
  timestamps: true
});

module.exports = Partner;
