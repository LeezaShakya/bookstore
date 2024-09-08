import express from 'express';
import authorRoutes from './authorRoute.js';
import booksRoutes from './booksRoute.js'
import genreRoutes from './genreRoute.js'
import userRoutes from './userRoute.js'
const router = express.Router();

// Use routes
router.use('/authors', authorRoutes);
router.use('/books', booksRoutes);
router.use('/genre', genreRoutes);
router.use('/user',userRoutes)
//remaining routes

export default router;