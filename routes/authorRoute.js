import express from 'express';
const router = express.Router();
import { createAuthor,getAllAuthors,getAuthorById ,deleteAuthor, updateAuthor } from '../controllers/authorController.js';


router.get('/', getAllAuthors);
router.get('/:slug', getAuthorById);
router.post('/', createAuthor);
router.delete('/:slug', deleteAuthor);
router.put('/:slug', updateAuthor);


export default router;