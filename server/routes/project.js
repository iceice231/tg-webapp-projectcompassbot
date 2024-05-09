import {Router} from "express";


import {checkAuth} from "../utils/checkAuth.js";
import {
    allProject,
    createOrganization,
    createProject,
    deleteProject, findProjects,
    getProjectById,
    updateProject
} from "../controllers/project.js";
import {createTask, deleteTask, getTask, updateTask} from "../controllers/task.js";
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
// const upload = multer({ dest: 'uploads/' })
// ,upload.single("isFile")
// Create Project
router.post('/create', checkAuth, multer({storage: storageConfig}).single("isFile"),createProject);
router.post('/create/org', createOrganization);
// Create Task for Project
router.post('/:id/task/create', checkAuth, createTask);
// Get one Task by ID
router.get('/:id/task/:idTask', checkAuth, getTask);
// Update Task by ID
router.put('/:id/task/:idTask', checkAuth, updateTask);
// Get all projects
router.get('/all', checkAuth,allProject);
// Get one project by ID
router.get('/:id', checkAuth, getProjectById);
// Delete project by ID
router.delete('/:id', checkAuth, deleteProject);
router.delete("/:id/task/:idTask", checkAuth, deleteTask)
// Update project by ID
router.put('/:id', checkAuth, updateProject);
// Find projects
router.post('/find', checkAuth, findProjects)

export default router;