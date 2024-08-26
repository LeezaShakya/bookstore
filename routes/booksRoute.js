import express from 'express';
import { DeleteBook, GetAllBooks, GetBookById, PostBook, UpdateBook} from '../controllers/booksController.js';
const router = express.Router();


router.post('/', PostBook )
router.get('/:slug', GetBookById )
router.get('/', GetAllBooks )
router.put('/:id', UpdateBook )
router.delete('/:id', DeleteBook )

export default router;