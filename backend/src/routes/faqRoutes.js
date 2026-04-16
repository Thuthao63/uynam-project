const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

router.get('/', async (req, res) => {
    try {
        const data = await FAQ.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', async (req, res) => {
    try {
        const newItem = await FAQ.create(req.body);
        res.status(201).json(newItem);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await FAQ.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
