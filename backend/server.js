const express = require('express');
const cors = require('cors');
const http = require('http'); // 1. Thêm thư viện http của Node
const { Server } = require('socket.io'); // 2. Thêm Socket.io
const { connectDB, sequelize } = require('./src/config/db');
const projectRoutes = require('./src/routes/projectRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // 3. Tạo server tích hợp app express

// 4. Cấu hình Socket.io để "nói chuyện" với React
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Link web React của Thảo
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 5. Middleware để "bắn" io vào mọi request (cho phép controller sử dụng)
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);

// 6. Lắng nghe tín hiệu kết nối từ Frontend
io.on('connection', (socket) => {
    console.log(`📡 Thiết bị kết nối Real-time: ${socket.id}`);

    // Khi khách hàng gửi tin nhắn thành công từ ContactForm
    socket.on('client_new_contact', (data) => {
        // Phát thông báo ngay lập tức cho trang Admin
        io.emit('new_contact_alert', data); 
    });
});

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true }); 
        console.log("✅ Các bảng dữ liệu của Uy Nam đã được đồng bộ!");
        
        const PORT = process.env.PORT || 5000;
        
        // 7. QUAN TRỌNG: Phải dùng server.listen thay vì app.listen
        server.listen(PORT, () => {
            console.log(`🚀 Server Real-time đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Lỗi khởi động:", error);
    }
};

startServer();