import express from 'express';
const router = express.Router();
import queryFilter from '../config/filter.js';
import { register, login, GetAllUser, GetUserById , UpdateUsername, ChangePassword} from '../controllers/userController.js';
import fetchUser from '../config/fetchUser.js';

router.post('/register', register);
router.post('/login', login);
router.get('/all',queryFilter({ 
    enableSearch: true,
  }), GetAllUser);
router.get('/:id', GetUserById);
router.patch('/:id', UpdateUsername);
router.post('/change-password', fetchUser, ChangePassword);


export default router;