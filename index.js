const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

// Use Routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

// Error Handling Middleware
const { errorHandler } = require('./auth');
app.use(errorHandler);

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
    .catch((err) => console.log(err));
 mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))
