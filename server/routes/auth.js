import {Router} from "express";
import {register, login, getMe, updateUser, createPosition} from "../controllers/auth.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router();

// Register
router.post('/register', register);
// Login
router.post('/login', login);
// Profile user
router.get('/profile', checkAuth, getMe);
router.post('/update', checkAuth, updateUser)
router.post('/position', createPosition)


export default router;