import express from 'express';
import {TotalCount} from '../controllers/dashboardController.js';
const router = express.Router();

router.get('/', TotalCount )


export default router;