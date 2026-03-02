
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Get all services
router.get('/', async (req, res) => {
  try {
    const servicesSnapshot = await db.collection('services').get();
    const services = [];
    servicesSnapshot.forEach(doc => {
      services.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error getting services', error });
  }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceDoc = await db.collection('services').doc(serviceId).get();

    if (!serviceDoc.exists) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ id: serviceDoc.id, ...serviceDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error getting service', error });
  }
});

// Add a new service
router.post('/', async (req, res) => {
  try {
    const newService = req.body;
    const addedService = await db.collection('services').add(newService);
    res.status(201).json({ id: addedService.id, ...newService });
  } catch (error) {
    res.status(500).json({ message: 'Error adding service', error });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const updatedService = req.body;

    await db.collection('services').doc(serviceId).update(updatedService);

    res.status(200).json({ id: serviceId, ...updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;

    await db.collection('services').doc(serviceId).delete();

    res.status(200).json({ message: `Service ${serviceId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
});

module.exports = router;
