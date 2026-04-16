const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { connectDB, sequelize } = require('./src/config/db');
const seedDatabase = require('./src/config/seed');
// ... (giữ nguyên các dòng import routes)
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Khởi tạo Socket.io với cấu hình CORS đồng nhất
const io = new Server(server, {
    cors: {
        origin: 'https://uynam-project.onrender.com',
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 2. Cấu hình CORS cho Express (CHỈ DÙNG 1 LẦN DUY NHẤT)
app.use(cors({
    origin: 'https://uynam-project.onrender.com', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 3. Middleware để "bắn" io vào mọi request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// ... (giữ nguyên các dòng app.use('/api/...') )

// 4. Lắng nghe tín hiệu kết nối Real-time
io.on('connection', (socket) => {
    console.log(`📡 Thiết bị kết nối Real-time: ${socket.id}`);
    socket.on('client_new_contact', (data) => {
        io.emit('new_contact_alert', data); 
    });
});

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true }); 
        console.log("✅ Dữ liệu đã đồng bộ!");
        await seedDatabase();
        
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 Server đang chạy trên cổng: ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Lỗi khởi động:", error);
    }
};

startServer();