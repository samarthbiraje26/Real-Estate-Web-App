const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const auth = require('../middleware/auth');

// Add Property
router.post('/', auth, async (req, res) => {
  const { title, description, location, price, imageUrl } = req.body;
  try {
    const property = new Property({ title, description, location, price, imageUrl, userId: req.user.userId });
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Properties (with search and pagination)
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search
    ? { $or: [{ title: new RegExp(search, 'i') }, { location: new RegExp(search, 'i') }] }
    : {};
  try {
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Property.countDocuments(query);
    res.json({ properties, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await property.deleteOne();
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;