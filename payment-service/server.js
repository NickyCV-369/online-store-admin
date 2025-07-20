import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initDB from './initDB.js';
import paymentRoutes from './src/routes/paymentRoutes.js';

dotenv.config();
initDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Payment Service running on port ${port}`);
});
