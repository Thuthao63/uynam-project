const express = require('express');
const router = express.Router();
const WorkflowStep = require('../models/WorkflowStep');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const data = await WorkflowStep.findAll({ order: [['stepId', 'ASC']] });
        res.json(data);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { stepId, title, desc, icon } = req.body;
        const imageUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
        const newItem = await WorkflowStep.create({ stepId, title, desc, icon, imageUrl });
        res.status(201).json(newItem);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await WorkflowStep.destroy({ where: { id: req.params.id } });
        res.json({ message: "Xóa thành công" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
