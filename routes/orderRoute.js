
import express from 'express';
const router = express.Router();
import { createOrder, getOrderById, getOrdersByUserId , getAllOrders,  updateOrderById } from '../controllers/orderController.js';
import fetchUser from '../config/fetchUser.js';
// Common user routes
router.post('/',fetchUser, createOrder);
router.get('/',fetchUser, getOrdersByUserId);

// Admin-specific routes
router.get('/:id',getOrderById);
router.get('/all', getAllOrders); 
router.put('/:id', updateOrderById); 
// router.delete('/:id', deleteOrderById);

export default router;
