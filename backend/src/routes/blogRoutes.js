const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const data = await BlogPost.findAll({ order: [['createdAt', 'DESC']] });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await BlogPost.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: "Không tìm thấy bài viết" });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, category, summary, content, author, date } = req.body;
        const imageUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
        const newItem = await BlogPost.create({ title, category, summary, content, author, date, imageUrl });
        res.status(201).json(newItem);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await BlogPost.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
