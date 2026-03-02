
const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.post('/', slotController.createSlot);
router.get('/', slotController.getAvailableSlots);
router.put('/:id', slotController.updateSlot);

module.exports = router;
