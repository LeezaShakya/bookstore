import express from 'express';
const router = express.Router();
import { PostCart, GetCart, DeleteCart } from '../controllers/cartController.js';
import fetchUser from '../config/fetchUser.js';

router.post('/',fetchUser, PostCart);
router.get('/',fetchUser, GetCart)
router.delete('/:id',fetchUser, DeleteCart)


export default router;