const express = require('express');
const cors = require('cors');
const http = require('http'); // 1. Thêm thư viện http của Node
const { Server } = require('socket.io'); // 2. Thêm Socket.io
const { connectDB, sequelize } = require('./src/config/db');
const seedDatabase = require('./src/config/seed');
const projectRoutes = require('./src/routes/projectRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testimonialRoutes = require('./src/routes/testimonialRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const workflowRoutes = require('./src/routes/workflowRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // 3. Tạo server tích hợp app express

// 4. Cấu hình Socket.io để "nói chuyện" với React
app.use(cors({
    // Thay link dưới đây bằng link Frontend thật của Thảo trên Render
    origin: 'https://uynam-project.onrender.com', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Bắt buộc phải có cái này vì Axios của Thảo đang để withCredentials = true
}));

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
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/home-content', homeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/teams', teamRoutes);

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
        
        // Tự động kiểm tra và bơm dữ liệu nếu DB đang trống
        await seedDatabase();
        
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