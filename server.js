require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;  // Changed port to 3002

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb+srv://Ayush:Sumana%4030@cluster0.5pqtgx5.mongodb.net/Ayush?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const orderRoutes = require('./routes/order');
const contactRoutes = require('./routes/contact');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payment');

app.use('/api/order', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
