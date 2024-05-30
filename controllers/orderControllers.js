const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { name, address, phone, menu, quantity, total } = req.body;
        const newOrder = new Order({ name, address, phone, menu, quantity, total });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
