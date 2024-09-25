
import express from 'express';
const router = express.Router();
import { createOrder , getOrderById , getAllOrders,  updateOrderById , deleteOrderById } from '../controllers/orderController.js';

// Common user routes
router.post('/', createOrder);
router.get('/:id', getOrderById);

// Admin-specific routes
router.get('/', getAllOrders); 
router.put('/:id', updateOrderById); 
router.delete('/:id', deleteOrderById);

export default router;
