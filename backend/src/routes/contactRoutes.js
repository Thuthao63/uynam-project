const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// API: Lấy danh sách tất cả các liên hệ
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API: Thêm một liên hệ mới (ĐÃ CẬP NHẬT ĐẦY ĐỦ TRƯỜNG)
router.post('/', async (req, res) => {
    try {
        // 1. Lấy thêm phone và service từ request body
        const { name, phone, email, service, message } = req.body;
        
        // 2. Truyền tất cả vào hàm create
        const newContact = await Contact.create({ 
            name, 
            phone, 
            email, 
            service, 
            message 
        });
        
        res.status(201).json(newContact);
    } catch (error) {
        // Nếu thiếu phone (do mình để allowNull: false ở Model) nó sẽ báo lỗi ở đây
        res.status(400).json({ message: error.message });
    }
});

// API: Xóa một liên hệ theo ID
router.delete('/:id', async (req, res) => {
    try {
        await Contact.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa liên hệ thành công" });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
});

module.exports = router;