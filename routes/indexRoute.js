import express from 'express';
import authorRoutes from './authorRoute.js';

import booksRoutes from './booksRoute.js'
import genreRoutes from './genreRoute.js'
import userRoutes from './userRoute.js'
import cartRoutes from './cartRoute.js'
import orderRoutes from './orderRoute.js';
import authRoutes from './authRoute.js'
import activityRoutes from './activityRoute.js'
import dashboardRoutes from './dashboardRoute.js'

const router = express.Router();

// Use routes
router.use('/authors', authorRoutes);
router.use('/auth', authRoutes);
router.use('/books', booksRoutes);
router.use('/genre', genreRoutes);
router.use('/user',userRoutes)
router.use('/cart',cartRoutes)
router.use('/orders', orderRoutes);
router.use('/activity', activityRoutes);
router.use('/dashboard', dashboardRoutes);
//remaining routes

export default router;