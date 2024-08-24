import express from 'express';
const router = express.Router();
import { createAuthor,getAllAuthors  } from '../controllers/authorController.js';

router.use('/createauthors', createAuthor);
router.use('/getauthors', getAllAuthors);

export default router;