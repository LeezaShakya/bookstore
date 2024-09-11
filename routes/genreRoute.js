import express from 'express';
import {PostGenre, GetAllGenre, GetGenreById, DeleteGenre, UpdateGenre} from '../controllers/genreController.js';
const router = express.Router();

router.post('/', PostGenre )
router.get('/:slug', GetGenreById )
router.get('/', GetAllGenre )
router.put('/:slug', UpdateGenre )
router.delete('/:slug', DeleteGenre )

export default router;