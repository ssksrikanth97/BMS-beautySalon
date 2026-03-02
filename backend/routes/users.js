
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Get all users
router.get('/', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    const addedUser = await db.collection('users').add(newUser);
    res.status(201).json({ id: addedUser.id, ...newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    await db.collection('users').doc(userId).update(updatedUser);

    res.status(200).json({ id: userId, ...updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    await db.collection('users').doc(userId).delete();

    res.status(200).json({ message: `User ${userId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
