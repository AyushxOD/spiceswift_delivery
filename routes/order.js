const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', (req, res) => {
    console.log('Received order:', req.body); // Log received data
    const newOrder = new Order({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        menu: req.body.menu,
        quantity: req.body.quantity,
        total: req.body.total,
        date: new Date()
    });

    newOrder.save()
        .then(order => res.json({ success: true, order }))
        .catch(err => {
            console.error('Error saving order:', err);
            res.status(400).json({ success: false, error: 'Unable to place order', details: err });
        });
});

module.exports = router;
