const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const data = await Partner.findAll({ order: [['createdAt', 'DESC']] });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, logo } = req.body;
        const imageUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
        const newItem = await Partner.create({ name, logo, imageUrl });
        res.status(201).json(newItem);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Partner.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
