import express from 'express';
const router = express.Router();
import { register, login, GetAllUser, GetUserById , UpdateUsername, ChangePassword} from '../controllers/userController.js';

router.post('/register', register);
router.post('/login', login);
router.get('/all', GetAllUser);
router.get('/:id', GetUserById);
router.patch('/:id', UpdateUsername);
router.post('/change-password', ChangePassword);


export default router;