const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const data = await TeamMember.findAll({ order: [['order', 'ASC']] });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, role, order } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.imageUrl;
        const newItem = await TeamMember.create({ name, role, order, imageUrl });
        res.status(201).json(newItem);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await TeamMember.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
