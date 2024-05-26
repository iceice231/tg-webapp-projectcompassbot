import Project from "../models/Project.js";
import Task from "../models/Task.js";
import File from "../models/File.js";
import User from "../models/User.js";
import Position from "../models/Position.js";
import Comment from "../models/Comment.js";

// Create Task
export const createTask = async (req, res) => {
    try {

        const projectId =  req.params.id
        const {nameTask, dateStart, dateEnd, description,status, priority, responsible} = req.body;

        const newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
        })
        await newFile.save();
        const filesDocuments = await File.findOne({nameFile: req.file.originalname})

        const userResponsible = await User.findOne({fullName: responsible})

        const newTask = new Task({
            nameTask,
            description,
            dateStart,
            dateEnd,
            project: projectId,
            status,
            priority,
            filesDocuments: [filesDocuments._id],
            responsible: [userResponsible._id]
        })

        await newTask.save();
        await Project.findByIdAndUpdate(projectId, {
            $push: {tasks: newTask},
        })
        await User.findByIdAndUpdate(userResponsible._id, {
            $push: {tasks: newTask}
        })


        res.json({
            message: "Задача успешно создана",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось создать задачу"
        })
    }
}

export const uploadFilesTechnical = async (req, res) => {
    try{

        const newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
        })
        await newFile.save();
        const filesTechnical = await File.findOne({nameFile: req.file.originalname})

        const taskId = req.params.idTask
        const task = await Task.findByIdAndUpdate(taskId, {
            filesTechnical: [filesTechnical._id]
        })
        await task.save()
        res.status(200).json({
            message: "Файлы успешно загружены"
        })

    } catch (error){

    }
}

// Get one Task by ID
export const getTask = async (req, res) => {
    try{
        const taskId = req.params.idTask;
        const task = await Task.findById(taskId)
        const user = await User.findById(req.userId)

        const filesDocumentsIds = task.filesDocuments
        const filesDocumentsPromises = await filesDocumentsIds.map(fileId => File.findById(fileId))
        const filesDocuments = await Promise.all(filesDocumentsPromises)

        const filesTechnicalIds = task.filesTechnical
        const filesTechnicalPromises = await filesTechnicalIds.map(fileId => File.findById(fileId))
        const filesTechnical = await Promise.all(filesTechnicalPromises)

        const commentsIds = task.comment
        const commentsPromises = await commentsIds.map(commentId => File.findById(commentId))
        const comments = await Promise.all(commentsPromises)

        const userResponsible = await User.findById(task.responsible)

        const position = await Position.findById(user.position)
        const namePosition = position.namePosition

        res.status(200).json({
            task,
            filesDocuments,
            filesTechnical,
            comments,
            userResponsible,
            namePosition,
            message: "Задача успешно открыта"
        })
    } catch (error){
        console.log(error)
        res.status(400).json({
            message: "Не удалось открыть задачу"
        })
    }

}

export const findTasks = async (req, res) => {
    try{
        const projectId = req.params.id
        const {nameTask, status, priority} = req.body
        console.log(req.body)
        const filter = {project: projectId}

        if(nameTask !== undefined){
            filter.nameTask = nameTask
        }
        if(status !== undefined){
            filter.status = status
        }
        if(priority !== undefined){
            filter.priority = priority
        }

        const tasks = await Task.find(filter)
        console.log(tasks)
        res.status(200).json({
            tasks,
            message: "Задачи успешно найдены"
        })
    } catch (error){
        console.log(error)
        res.status(400).json({
            message: "Не удалось найти задачи"
        })
    }

}

// Delete Task by ID
export const deleteTask = async (req, res) => {
    try {
        const idTask = req.params.idTask
        const task = await Task.findByIdAndDelete(idTask)
        await Project.findOneAndUpdate({tasks: idTask}, {
            $pull: {
                tasks: req.params.idTask
            }
        })
        await User.findByIdAndUpdate({tasks: idTask}, {
            $pull: {
                tasks: req.params.idTask
            }
        })

        let comment = await Comment.find({task: idTask})
        if (!Array.isArray(comment)) {
            comment = [];
        }
        comment.map(async (commentItem) => {
            await Comment.findByIdAndDelete(commentItem._id)
            await Task.findOneAndUpdate({comment: commentItem._id}, {
                $pull: {
                    comment: commentItem._id
                }
            })
        })

        res.json({message: "Задача успешно удалёна"})
    } catch (error){
        res.status(400).json({
            message: "Не удалось удалить задачу"
        })
    }
}

// Update Task by ID
export const updateTask = async (req, res) => {
    try {
      const { nameTask, dateStart, dateEnd, priority, status, description, responsible } = req.body;
      const idTask = req.params.idTask;

      let newFile;
      let file;
      let fileSearch

      if(req.file) {
          fileSearch = await File.findOne({nameFile: req.file.originalname})
      }

      if(!fileSearch){
         newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
            })
         await newFile.save();
      }

      if(newFile != undefined){
          file = await File.findOne({nameFile: req.file.originalname})
      }

        const userResponsible = await User.findOne({fullName: responsible})

        const task = await Task.findByIdAndUpdate(idTask,
            {
                nameTask: nameTask,
                status: status,
                priority: priority,
                dateStart: dateStart,
                dateEnd: dateEnd,
                description: description,
                files: file != undefined ? [file._id] : [],
                responsible: userResponsible._id
            },
            {
                new: true
            })

        await task.save();

      res.status(200).json({message:"Задача успешно изменена"})
      await task.save();
    } catch (error){
        res.status(400).json({
            message: "Не удалось изменить задачу",
        })
    }
}