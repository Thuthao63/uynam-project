const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const { verifyPassword } = require('../utils/auth');

// API: Đăng nhập quản trị viên
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminUser = await AdminUser.findOne({ where: { username } });
        if (!adminUser) {
            return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
        }

        const isValid = verifyPassword(password, adminUser.salt, adminUser.passwordHash);
        if (!isValid) {
            return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
        }

        return res.json({ success: true, message: "Đăng nhập thành công" });
    } catch (error) {
        console.error('Lỗi đăng nhập admin:', error);
        return res.status(500).json({ success: false, message: "Lỗi máy chủ, hãy thử lại sau" });
    }
});

module.exports = router;
