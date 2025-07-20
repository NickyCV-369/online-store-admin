import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import customerRoutes from './src/routes/customerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/customersdb';

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Customer Service running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
