import express from 'express';
const router = express.Router();
import { GetAllActivity } from '../controllers/activityController.js';

router.get('/', GetAllActivity);

export default router;