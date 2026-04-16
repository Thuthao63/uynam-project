const express = require('express');
const router = express.Router();
require('dotenv').config();

// API: Đăng nhập quản trị viên
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Lấy thông tin từ biến môi trường
    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASS || '123456';

    if (username === validUser && password === validPass) {
        // Trả về success: true cho Frontend kiểm duyệt
        return res.json({ success: true, message: "Đăng nhập thành công" });
    }

    return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
});

module.exports = router;
