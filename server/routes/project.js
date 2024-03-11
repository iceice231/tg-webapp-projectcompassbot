import {Router} from "express";

import {checkAuth} from "../utils/checkAuth.js";
import {allProject, createProject, deleteProject, getProjectById, updateProject} from "../controllers/project.js";
import {createTask, deleteTask, getTask} from "../controllers/task.js";

const router = new Router();

// Create Project
router.post('/create', checkAuth, createProject);
// Create Task for Project
router.post('/:id/task/create', checkAuth, createTask);
// Get one Task by ID
router.get('/:id/task/:idTask', checkAuth, getTask);
// Get all projects
router.get('/all', checkAuth,allProject);
// Get one project by ID
router.get('/:id', checkAuth, getProjectById);
// Delete project by ID
router.delete('/:id', checkAuth, deleteProject);
router.delete("/:id/task/:idTask", checkAuth, deleteTask)
// Update project by ID
router.put('/:id', checkAuth, updateProject);

export default router;