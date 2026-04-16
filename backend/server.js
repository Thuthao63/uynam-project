const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { connectDB, sequelize } = require('./src/config/db');
const seedDatabase = require('./src/config/seed');

// --- IMPORT CÁC ROUTES (Thảo kiểm tra tên file trong src/routes nhé) ---
const projectRoutes = require('./src/routes/projectRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testimonialRoutes = require('./src/routes/testimonialRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const homeRoutes = require('./src/routes/homeRoutes'); // <--- Route cho home-content
const serviceRoutes = require('./src/routes/serviceRoutes');
const workflowRoutes = require('./src/routes/workflowRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
const AdminUser = require('./src/models/AdminUser');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Khởi tạo Socket.io
const io = new Server(server, {
    cors: {
        origin: 'https://uynam-project.onrender.com',
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 2. Cấu hình CORS cho Express
app.use(cors({
    origin: 'https://uynam-project.onrender.com', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 3. Middleware Socket.io
app.use((req, res, next) => {
    req.io = io;
    next();
});

// --- 4. ĐỊNH NGHĨA CÁC ĐƯỜNG DẪN API ---
// Thảo lưu ý: Tên ở đây phải khớp 100% với tên Axios gọi ở Frontend
app.use('/api/projects', projectRoutes);
app.use('/api/home-content', homeRoutes); // <--- Sửa để khớp với axios.get('/api/home-content')
app.use('/api/services', serviceRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/teams', teamRoutes);

// 5. Socket.io Events
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