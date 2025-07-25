import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct, updateProductStock } from '../controllers/productController.js';

const router = express.Router();
router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateProductStock);

export default router;
