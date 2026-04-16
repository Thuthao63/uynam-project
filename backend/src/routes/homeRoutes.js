const express = require('express');
const router = express.Router();
const HomeContent = require('../models/HomeContent');

// Lấy tất cả cài đặt
router.get('/', async (req, res) => {
    try {
        const data = await HomeContent.findAll();
        // Chuyển mảng thành object { key: value } để dễ dùng ở frontend
        const settings = {};
        data.forEach(item => {
            settings[item.key] = item.value;
        });
        res.json(settings);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// Cập nhật hoặc thêm mới (Upsert)
router.post('/bulk', async (req, res) => {
    try {
        const updates = req.body; // Mảng các { key, value, category }
        for (const item of updates) {
            await HomeContent.upsert(item);
        }
        res.json({ message: "Cập nhật thành công" });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

module.exports = router;
