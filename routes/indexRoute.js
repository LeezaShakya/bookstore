import express from 'express';
import authorRoutes from './authorRoute.js';
import userRoutes from './userRoute.js';
import genreRoutes from './genreRoute.js'
import bookRoutes from './booksRoute.js';
import orderRoutes from './orderRoute.js';

const router = express.Router();

// Use routes
router.use('/authors', authorRoutes);
router.use('/user', userRoutes);
router.use('/genre', genreRoutes);
router.use('/books', bookRoutes);
router.use('/v1/orders', orderRoutes);
//remaining routes

export default router;