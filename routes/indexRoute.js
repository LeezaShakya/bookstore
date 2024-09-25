import express from 'express';
import authorRoutes from './authorRoute.js';

import booksRoutes from './booksRoute.js'
import genreRoutes from './genreRoute.js'
import userRoutes from './userRoute.js'
import cartRoutes from './cartRoute.js'
import orderRoutes from './orderRoute.js';

const router = express.Router();

// Use routes
router.use('/authors', authorRoutes);

router.use('/books', booksRoutes);
router.use('/genre', genreRoutes);
router.use('/user',userRoutes)
router.use('/cart',cartRoutes)
router.use('/orders', orderRoutes);
//remaining routes

export default router;