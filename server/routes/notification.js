import {Router} from "express";

import {checkAuth} from "../utils/checkAuth.js";
import {updateNotification} from "../controllers/notification.js";

const router = new Router();

// Register
router.post('/setting', checkAuth,updateNotification);



export default router;