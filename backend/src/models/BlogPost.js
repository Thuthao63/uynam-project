const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "Kiến Thức"
  },
  summary: {
    type: DataTypes.TEXT,
    comment: "Mô tả ngắn hiển thị ở danh sách"
  },
  content: {
    type: DataTypes.TEXT,
    comment: "Nội dung bài viết (Rich Text)"
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: "Uy Nam Admin"
  },
  date: {
    type: DataTypes.STRING,
    comment: "Ngày hiển thị (VD: 16 Tháng 4, 2026)"
  }
}, {
  timestamps: true
});

module.exports = BlogPost;
