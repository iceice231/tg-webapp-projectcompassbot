import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
    try {

        const projectId =  req.params.id
        const {nameTask, status, priority} = req.body;

        const newTask = new Task({
            nameTask,
            project: projectId,
            status,
            priority,
        })

        await newTask.save();
        await Project.findByIdAndUpdate(projectId, {
            $push: {tasks: newTask},
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

// Get one Task by ID
export const getTask = async (req, res) => {
    try{
        const taskId = req.params.idTask;
        const task = await Task.findById(taskId)
        res.status(200).json({
            task,
            message: "Задача успешно открыта"
        })
    } catch (error){
        console.log(error)
        res.status(400).json({
            message: "Не удалось открыть задачу"
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
        res.json({message: "Задача успешно удалёна"})
    } catch (error){
        res.status(400).json({
            message: "Не удалось удалить задачу"
        })
    }
}

// Updata Task by ID
export const updateTask = async (req, res) => {
    try {
      const { nameTask } = req.body;
      const idTask = req.params.idTask;
      const task = await Task.findById(idTask);
      task.nameTask = nameTask;
      res.status(200).json({message:"Задача успешно изменена"})
      await task.save();
    } catch (error){
        res.status(400).json({
            message: "Не удалось изменить задачу",
        })
    }
}