const express = require('express');
const connectDB = require('./config/db');
const comicRoutes = require('./routes/comicRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/comics', comicRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
