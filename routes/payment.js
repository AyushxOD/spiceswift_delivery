const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Process payment and create order (Simulated Payment)
router.post('/', async (req, res) => {
    const { amount, token, ...orderData } = req.body;

    try {
        // Simulate successful payment
        console.log('Simulated payment success for amount:', amount);

        // Save the order to MongoDB
        const newOrder = new Order(orderData);
        await newOrder.save();
        console.log('Order saved:', newOrder);

        res.json({ success: true, order: newOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
