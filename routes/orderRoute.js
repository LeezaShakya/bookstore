
import express from 'express';
const router = express.Router();
import { createOrder, getOrderById, getOrdersByUserId , getAllOrders,  updateOrderById } from '../controllers/orderController.js';
import fetchUser from '../config/fetchUser.js';
// Admin-specific routes
router.get('/all', getAllOrders); 
router.get('/:id',getOrderById);
router.put('/:id', updateOrderById); 
// router.delete('/:id', deleteOrderById);
// Common user routes
router.post('/',fetchUser, createOrder);
router.get('/',fetchUser, getOrdersByUserId);



export default router;
