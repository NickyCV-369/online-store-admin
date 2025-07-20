import express from 'express';
import {
  getOrders,
  getOrderDetail,
  addOrder,
  updateOrderStatus,
  deleteOrder,
  getSummary,
  getDailySummary
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderDetail);
router.post('/', addOrder);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);
router.get('/summary/all', getSummary);
router.get('/summary/daily', getDailySummary);

export default router;
