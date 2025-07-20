import express from 'express';
import cors from 'cors';
import orderRoutes from './src/routes/orderRoutes.js';
import initDB from './initDB.js';

const app = express();
app.use(cors());
app.use(express.json());

initDB().then(() => {
  app.use('/api/orders', orderRoutes);

  const port = process.env.PORT || 3002;
  app.listen(port, () => console.log(`🚀 Order Service running on port ${port}`));
});
