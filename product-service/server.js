import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/productsdb';
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Product Service running on port ${port}`));
