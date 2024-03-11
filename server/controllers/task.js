import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
    try {

        const projectId =  req.params.id
        const {nameTask} = req.body;

        const newTask = new Task({
            nameTask,
            project: projectId,
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

    }

}

// Delete Task by ID
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.idTask)
        await Project.findOneAndUpdate({tasks: req.params.idTask}, {
            $pull: {
                tasks: req.params.idTask
            }
        })
        res.json({message: "Задача успешно удалёна"})
    } catch (error){
        res.status(400).json({
            message: "Ошибка при удалении задачи"
        })
    }
}
