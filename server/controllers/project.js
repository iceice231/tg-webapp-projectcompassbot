import User from '../models/User.js';
import Organization from "../models/Organization.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Create project
export const createProject = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({
                message:"Ошибка"
            })
        }

        const {nameProject, budget} = req.body;

        const newProject = new Project({
            nameProject,
            budget,
            organization: user.organization,
        })

        await newProject.save();
        await Organization.findByIdAndUpdate(user.organization, {
            $push: {projects: newProject},
        })

        res.json({
            message: "Проект успешно создан",
        })
    } catch (error) {
        console.log(error)
    }
}
// Get all project
export const allProject = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({
                message:"Ошибка"
            })
        }
        const projects = await Project.find({organization: user.organization})
        res.json({
            projects
        })
    } catch (error){

    }
}
// Get project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        const taskIds = project.tasks;
        const tasksPromises = await taskIds.map(taskId => Task.findById(taskId));
        const tasks = await Promise.all(tasksPromises);

        res.status(200).json({project, tasks})
    } catch (error){
        res.status(400).json({
            message: "Ошибка при поиске проекта"
        })
    }
}
// Delete project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        await Organization.findOneAndUpdate({projects: req.params.id}, {
            $pull: {
                projects: req.params.id
            }
        })
        res.json({message: "Проект успешно удалён"})
    } catch (error){
        res.status(400).json({
            message: "Ошибка при поиске проекта"
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { nameProject, budget } = req.body
        const project = await Project.findById(req.params.id)
        project.nameProject = nameProject
        project.budget = budget
        res.status(200).json({message:"Проект изменён"})
        await project.save();
    } catch (error){
        res.status(400).json({
            message: "Ошибка"
        })
    }
}