import {Router} from "express";
import {checkAuth} from "../utils/checkAuth.js";
import multer from "multer";
import {deleteStaffUser, getStaff, getStaffUser, updateStaffUser} from "../controllers/staff.js";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const router = new Router();

router.get('/all', checkAuth, getStaff)
router.get('/user/:idUser', checkAuth, getStaffUser)
router.post('/user/update/:idUser', checkAuth, updateStaffUser)
router.delete('/user/delete/:idUser', checkAuth, deleteStaffUser)

export default router;