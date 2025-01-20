import express from 'express';
import { DeleteBook, GetAllBooks, GetBookById, PostBook, UpdateBook} from '../controllers/booksController.js';
import queryFilter from '../config/filter.js';
import fetchUser from '../config/fetchUser.js';
const router = express.Router();

router.post('/',fetchUser, PostBook )
router.get('/:slug', GetBookById )
router.get('/', queryFilter({ 
    enableSearch: true,
    enableBookFilters: true
  }), GetAllBooks);
router.put('/:slug',fetchUser, UpdateBook )
router.delete('/:slug',fetchUser, DeleteBook )

export default router;