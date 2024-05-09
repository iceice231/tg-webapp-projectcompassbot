import User from '../models/User.js';
import Organization from "../models/Organization.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import File from "../models/File.js";


// Create project
export const createProject = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({
                message:"Ошибка"
            })
        }

        const {nameProject,dateStart, dateEnd, budget, status, description} = req.body;

        const newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
        })

        await newFile.save();
        const file = await File.findOne({nameFile: req.file.originalname})


        const newProject = new Project({
            nameProject,
            dateStart,
            dateEnd,
            budget,
            status,
            description,
            organization: user.organization,
            files: [file._id]
        })

        await newProject.save();
        await Organization.findByIdAndUpdate(user.organization, {
            $push: {projects: newProject},
        })

        res.json({
            message: "Проект успешно создан",
            // newProject
        });
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

export const createOrganization = async (req, res) => {
    try {

        const {nameOrganization, key} = req.body;

        const newOrganization = new Organization({
            nameOrganization,
            key,
        })
        await newOrganization.save();
    } catch (error){

    }
}
// Get project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)

        const filesIds = project.files
        const filesPromises = await filesIds.map(fileId => File.findById(fileId))
        const files = await Promise.all(filesPromises)

        const taskIds = project.tasks;
        const tasksPromises = await taskIds.map(taskId => Task.findById(taskId));
        const tasks = await Promise.all(tasksPromises);

        res.status(200).json({project, tasks, files})
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

export const findProjects = async (req, res) => {
    try {
        const {nameProject, status, userId} = req.body
        const user = await User.findById(req.userId)
        let projects;

        if(nameProject != undefined && status == undefined){
            projects = await Project.findOne({nameProject: nameProject, organization: user.organization})
        } else if (nameProject == undefined && status != undefined) {
            projects = await Project.find({status: status, organization: user.organization})
        } else {
            projects = await Project.find({nameProject: nameProject, status: status, organization: user.organization})
        }


        res.json({
            message: "Проекты успешно найдены",
            projects,
        })

    } catch (error){
        res.status(400).json({
            message: "Не удалось найти проекты"
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