import {Router} from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {createReport, deleteReport, findReports, getAllReport} from "../controllers/report.js";
import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const router = new Router();

router.post('/create', checkAuth, multer({storage: storageConfig}).single("isFile"),createReport);
router.get('/all', checkAuth, getAllReport)
router.post('/find', checkAuth, findReports)
router.delete('/delete/:idReport', checkAuth, deleteReport)

export default router;