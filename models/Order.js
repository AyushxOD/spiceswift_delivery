const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    menu: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
