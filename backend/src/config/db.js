const { Sequelize } = require('sequelize');
require('dotenv').config();

// Khởi tạo kết nối Sequelize (Cấu hình cho Aiven Cloud)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // 1. THÊM DÒNG NÀY để nhận Port từ Aiven
    dialect: 'mysql',
    logging: false,
    // 2. THÊM ĐOẠN dialecOptions DƯỚI NÀY
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Bắt buộc phải có để Cloud chấp nhận kết nối
      }
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Uy Nam Database connected successfully via Aiven!');
  } catch (error) {
    console.error('❌ Lỗi kết nối MySQL trên Cloud:', error.message);
  }
};

module.exports = { sequelize, connectDB };