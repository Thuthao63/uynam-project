const { Sequelize } = require('sequelize');
require('dotenv').config();

// Khởi tạo kết nối Sequelize (Giống như Hibernate trong Java)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Tắt log SQL để terminal sạch sẽ
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Uy Nam Database connected successfully!');
  } catch (error) {
    console.error('❌ Lỗi kết nối MySQL:', error.message);
  }
};

module.exports = { sequelize, connectDB };