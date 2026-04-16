const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    comment: "Chức vụ hoặc địa chỉ của khách"
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://via.placeholder.com/150"
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  }
}, {
  timestamps: true
});

module.exports = Testimonial;
