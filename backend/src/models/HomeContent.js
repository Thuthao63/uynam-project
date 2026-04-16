const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Model này dùng để lưu các thông số "lẻ" như Stats, Hero Text, Partners
const HomeContent = sequelize.define('HomeContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: "Tên thuộc tính (VD: stat_projects, stat_experience, hero_title)"
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    comment: "Nhóm thuộc tính (Stats, Hero, Partners...)"
  }
}, {
  timestamps: true
});

module.exports = HomeContent;
