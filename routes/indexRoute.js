import express from 'express';
import authorRoutes from './authorRoute.js';

const router = express.Router();

// Use routes
router.use('/authors', authorRoutes);
//remaining routes

export default router;