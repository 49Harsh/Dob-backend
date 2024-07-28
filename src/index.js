
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) =>{
    console.log('Error connecting to MongoDB:', err);
})

// Import routes
const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folders');
const imageRoutes = require('./routes/images');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/images', imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});