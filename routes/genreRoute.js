import express from 'express';
import queryFilter from '../config/filter.js';
import {PostGenre, GetAllGenre, GetGenreById, DeleteGenre, UpdateGenre} from '../controllers/genreController.js';
const router = express.Router();

router.post('/', PostGenre )
router.get('/:slug', GetGenreById )
router.get('/',queryFilter({ 
    enableSearch: true,
  }), GetAllGenre )
router.put('/:slug', UpdateGenre )
router.delete('/:slug', DeleteGenre )

export default router;