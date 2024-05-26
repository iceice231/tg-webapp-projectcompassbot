import User from '../models/User.js';
import Organization from "../models/Organization.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import File from "../models/File.js";
import Position from "../models/Position.js";
import TypeReport from "../models/TypeReport.js";
import Comment from "../models/Comment.js";


// Create project
export const createProject = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({
                message:"Ошибка"
            })
        }

        const {nameProject,dateStart, dateEnd, budget, status, description, responsible} = req.body;
        if(req.file){
            const newFile = new File({
                nameFile: req.file.originalname,
                urlPath: req.file.path
            })

            await newFile.save();
        }

        const file = await File.findOne({nameFile: req.file.originalname})

        const userResponsible = await User.findOne({fullName: responsible})

        let newProject;
        const position = await Position.findById(user.position)
        if(position.namePosition == "Рукводящая должность"){
            newProject = new Project({
                nameProject,
                dateStart,
                dateEnd,
                budget,
                status,
                description,
                organization: user.organization,
                files: [file._id],
                responsible: [userResponsible._id]
            })
            await newProject.save();
            await Organization.findByIdAndUpdate(user.organization, {
                $push: {projects: newProject},
            })
            res.json({
                message: "Проект успешно создан",
                // newProject
            });
        } else {
            res.json({
                message: "У вас нет доступа, чтобы создать проект"
            })
        }



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
        const position = await Position.findById(user.position)
        const namePosition = position.namePosition
        res.json({
            projects,
            namePosition
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
        const user = await User.findById(req.userId)
        console.log(user)
        const filesIds = project.files
        const filesPromises = await filesIds.map(fileId => File.findById(fileId))
        const files = await Promise.all(filesPromises)

        const taskIds = project.tasks;
        const tasksPromises = await taskIds.map(taskId => Task.findById(taskId));
        const tasks = await Promise.all(tasksPromises);

        const userResponsible = await User.findById(project.responsible)

        const position = await Position.findById(user.position)
        const namePosition = position.namePosition

        res.status(200).json({project, tasks, files, userResponsible, namePosition})
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

        let tasks = await Task.find({project: req.params.id})
        if (!Array.isArray(tasks)) {
            tasks = [];
        }
        tasks.map(async (taskItem) => {
            await Task.findByIdAndDelete(taskItem._id)
            let comment = await Comment.find({task: taskItem._id})
            if (!Array.isArray(comment)) {
                comment = [];
            }
            comment.map(async(commentItem) => {
                await Comment.findByIdAndDelete(commentItem._id)
            })
            let users = await User.find({tasks: taskItem._id})
            if (!Array.isArray(users)) {
                users = [];
            }
            users.map(async(userItem) => {
                await User.findByIdAndUpdate(userItem._id, {
                    $pull: {
                        tasks: taskItem._id
                    }
                })
            })
        })
        res.json({message: "Проект успешно удалён"})
    } catch (error){
        res.status(400).json({
            message: "Ошибка при поиске проекта"
        })
    }
}

export const createReportType = async (req, res) => {
    try {
        const {nameTypeReport} = req.body
        const newTypeReport = new TypeReport({
            nameTypeReport: nameTypeReport
        })
        await newTypeReport.save()
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

        const filter = {organization: user.organization}

        if(nameProject != undefined){
            filter.nameProject = nameProject
        }
        if(status != undefined){
            filter.status = status
        }

        const projects = await Project.find(filter)


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
        const { nameProject, budget, dateStart, dateEnd, status, description, responsible } = req.body

        let newFile;
        let file;
        let fileSearch
        const updateData = {}

        if(req.file) {
            fileSearch = await File.findOne({nameFile: req.file.originalname})
        }

        if(!fileSearch){
            newFile = new File({
                nameFile: req.file.originalname,
                urlPath: req.file.path
            })
            await newFile.save();
            file = await File.findOne({nameFile: req.file.originalname})
            if(file){
                updateData.files = [file._id]
            }
        }


        if(nameProject !== undefined){
            updateData.nameProject = nameProject
        }
        if(budget !== undefined){
            updateData.budget = budget
        }
        if(status !== undefined){
            updateData.status = status
        }
        if(dateStart !== undefined){
            updateData.dateStart = dateStart
        }
        if(dateEnd !== undefined){
            updateData.dateEnd = dateEnd
        }
        if(description !== undefined){
            updateData.description = description
        }
        if(responsible !== undefined){
            const userResponsible = await User.findOne({fullName: responsible})
            updateData.responsible = userResponsible._id
        }


        const project = await Project.findByIdAndUpdate(req.params.id, updateData,
            {
                new: true
            })

        await project.save();
        res.status(200).json({message:"Проект изменён"})
    } catch (error){
        res.status(400).json({
            message: "Ошибка в изменении проекта",
        })
    }
}