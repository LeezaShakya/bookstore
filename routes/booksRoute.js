import express from 'express';
import { DeleteBook, GetAllBooks, GetBookById, PostBook, UpdateBook} from '../controllers/booksController.js';
const router = express.Router();


router.post('/', PostBook )
router.get('/:slug', GetBookById )
router.get('/', GetAllBooks )
router.put('/:slug', UpdateBook )
router.delete('/:slug', DeleteBook )

export default router;