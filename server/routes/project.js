import {Router} from "express";


import {checkAuth} from "../utils/checkAuth.js";
import {
    allProject,
    createOrganization,
    createProject, createReportType,
    deleteProject, findProjects,
    getProjectById,
    updateProject
} from "../controllers/project.js";
import {createTask, deleteTask, findTasks, getTask, updateTask, uploadFilesTechnical} from "../controllers/task.js";
import multer from "multer";
import {createComment, getComments} from "../controllers/comment.js";
import req from "express/lib/request.js";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storageConfig}).single("isFile")
const checkFile = (req, res, next) => {
    console.log(req.file)
    if(req.file === undefined){
        return next()
    }
    upload(req, res, (err) => {
        next();
    })
}

const router = new Router();

// Create Project
router.post('/create', checkAuth, multer({storage: storageConfig}).single("isFile"),createProject);
router.post('/create/org', createOrganization);
// Create Task for Project
router.post('/:id/task/create', checkAuth, multer({storage: storageConfig}).single("isFile"),createTask);
// Get one Task by ID
router.get('/:id/task/:idTask', checkAuth, getTask);
// Update Task by ID
router.post('/task/:idTask/update', checkAuth, updateTask);
// Get all projects
router.get('/all', checkAuth,allProject);
// Get one project by ID
router.get('/:id', checkAuth, getProjectById);
// Delete project by ID
router.delete('/:id', checkAuth, deleteProject);
router.delete("/:id/task/:idTask", checkAuth, deleteTask)
// Update project by ID
router.post('/update/:id', checkAuth, checkFile, updateProject);
// Find projects
router.post('/find', checkAuth, findProjects)
router.post('/:id/task/find', checkAuth, findTasks)
router.post('/:id/task/:idTask/file/upload', checkAuth, multer({storage: storageConfig}).single("isFile"), uploadFilesTechnical)
router.post('/task/:idTask/comment/create', checkAuth, multer({storage: storageConfig}).single("isFile"), createComment)
router.get('/task/:idTask/comment/all', checkAuth, getComments)
router.post('/report/create', createReportType)

export default router;