const Slot = require('../models/Slot');

exports.createSlot = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const newSlot = new Slot({ startTime, endTime });
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isAvailable: true });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slot) {
      return res.status(404).json({ msg: 'Slot not found' });
    }
    res.json(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
