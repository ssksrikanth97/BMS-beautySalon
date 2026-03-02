
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookingsSnapshot = await db.collection('bookings').get();
    const bookings = [];
    bookingsSnapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error getting bookings', error });
  }
});

// Get bookings for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookingsSnapshot = await db.collection('bookings').where('userId', '==', userId).get();
    const bookings = [];
    bookingsSnapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user bookings', error });
  }
});

// Add a new booking
router.post('/', async (req, res) => {
  try {
    const newBooking = req.body;
    const addedBooking = await db.collection('bookings').add(newBooking);
    res.status(201).json({ id: addedBooking.id, ...newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error adding booking', error });
  }
});

// ... other booking-related routes (update, delete, etc.)

module.exports = router;
