const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục 'uploads' nếu chưa có
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

// API: Lấy danh sách (Giữ nguyên)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
        res.json(projects);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// API: Lấy dự án theo ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Không tìm thấy dự án" });
        res.json(project);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// API: Thêm dự án MỚI có Upload ảnh (CẬP NHẬT)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category } = req.body;
        // Nếu có file thì lấy đường dẫn file, không thì lấy mặc định
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";
        
        const newProject = await Project.create({ title, description, imageUrl, category });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API: Xóa (Giữ nguyên như cũ)
router.delete('/:id', async (req, res) => {
    try {
        await Project.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;