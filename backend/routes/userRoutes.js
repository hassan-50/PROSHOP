import express from 'express'
const router = express.Router();
import { authUser , getUserProfile, registerUser, UpdateUserProfile } from '../controllers/userController.js';
import {protect} from '../middlewares/protect.js';

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect , UpdateUserProfile)

export default router