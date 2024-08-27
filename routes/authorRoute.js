import express from 'express';
const router = express.Router();
import { createAuthor,getAllAuthors,getAuthorById ,deleteAuthor, updateAuthor } from '../controllers/authorController.js';


router.get('/getauthor', getAllAuthors);
router.get('/getauthor/:slug', getAuthorById);
router.post('/createauthor', createAuthor);
router.delete('/deleteauthor/:id', deleteAuthor);
router.put('/updateauthor/:id', updateAuthor);


export default router;