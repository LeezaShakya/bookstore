import express from 'express';
import authorRoutes from './authorRoute.js';
import booksRoutes from './booksRoute.js'

const router = express.Router();


// Use routes
router.use('/authors', authorRoutes);
router.use('/books', booksRoutes);
//remaining routes

export default router;