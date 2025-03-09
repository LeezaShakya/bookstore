import express from 'express';
const router = express.Router();
import { GetAllActivity,GetTotal } from '../controllers/activityController.js';

router.get('/', GetAllActivity);
router.get('/total', GetTotal);

export default router;