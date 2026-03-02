const Booking = require('../models/Booking');
const Slot = require('../models/Slot');

exports.createBooking = async (req, res) => {
  const { userId, serviceId, slotId } = req.body;

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const slot = await Slot.findById(slotId).session(session);
    if (!slot || !slot.isAvailable) {
      throw new Error('Slot not available');
    }

    await Slot.findByIdAndUpdate(slotId, { isAvailable: false }, { session });

    const booking = new Booking({ user: userId, service: serviceId, slot: slotId });
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(booking);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('service').populate('slot');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('service').populate('slot');
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (status && status === 'cancelled') {
      const slot = await Slot.findById(booking.slot);
      if (slot) {
        slot.isAvailable = true;
        await slot.save();
      }
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
