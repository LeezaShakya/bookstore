import express from 'express';
import { DeleteBook, GetAllBooks, GetBookById, PostBook, UpdateBook} from '../controllers/booksController.js';
import queryFilter from '../config/filter.js';
const router = express.Router();

router.post('/', PostBook )
router.get('/:slug', GetBookById )
router.get('/', queryFilter({ 
    enableSearch: true,
    enableBookFilters: true
  }), GetAllBooks);
router.put('/:slug', UpdateBook )
router.delete('/:slug', DeleteBook )

export default router;