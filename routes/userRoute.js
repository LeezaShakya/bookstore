import express from 'express';
const router = express.Router();
import queryFilter from '../config/filter.js';
import { GetAllUser, GetUserById , UpdateUsername, ChangePassword} from '../controllers/userController.js';
import fetchUser from '../config/fetchUser.js';


router.get('/all',queryFilter({ 
    enableSearch: true,
  }), GetAllUser);
router.get('/:id', GetUserById);
router.patch('/:id', UpdateUsername);
router.post('/change-password', fetchUser, ChangePassword);


export default router;