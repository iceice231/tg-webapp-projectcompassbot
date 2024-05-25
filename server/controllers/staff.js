import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Task from "../models/Task.js";
import Position from "../models/Position.js";
import TypeReport from "../models/TypeReport.js";
import Project from "../models/Project.js";
import comment from "../models/Comment.js";
import Comment from "../models/Comment.js";

export const getStaff = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const organization = await Organization.findById(user.organization)

        const personalIds = organization.personal
        const personalPromises = await personalIds.map(userId => User.findById(userId))
        const personal = await Promise.all(personalPromises)

        res.json({
            personal,
            message: "Сотрудники успешно получены",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить сотрудников"
        })
    }
}
export const getStaffUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.idUser)
            .populate('position')

        const taskIds = user.tasks;
        const tasksPromises = await taskIds.map(taskId => Task.findById(taskId));
        const tasks = await Promise.all(tasksPromises);

        res.json({
            user,
            tasks,
            message: "Сотрудники успешно получены",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить сотрудников"
        })
    }
}

export const deleteStaffUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.idUser)

        await Organization.findOneAndUpdate({personal: req.params.idUser}, {
            $pull: {
                personal: req.params.idUser
            }
        })
        await Project.findOneAndUpdate({responsible: req.params.idUser}, {
            $pull: {
                responsible: req.params.idUser
            }
        })
        await Task.findOneAndUpdate({responsible: req.params.idUser}, {
            $pull: {
                responsible: req.params.idUser
            }
        })

        let comment = await Comment.find({user: req.params.idUser})
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

        res.json({
            message: "Сотрудник успешно удален",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось удалить сотрудника"
        })
    }
}

export const updateStaffUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.idUser)
        const {email, fullName, birthday, address, phone, position, keyDirector} = req.body

        let positionId;

        const organization = await Organization.findById(user.organization)

        let dataUpdate = {};

        if (email !== undefined && fullName !== "") {
            dataUpdate.email = email;
        }
        if (fullName !== undefined && fullName !== "") {
            dataUpdate.fullName = fullName;
        }
        if (birthday !== undefined) {
            dataUpdate.birthday = birthday;
        }
        if (address !== undefined && fullName !== "") {
            dataUpdate.address = address;
        }
        if (phone !== undefined && fullName !== "") {
            dataUpdate.phone = phone;
        }
        if (position !== undefined) {
            if (keyDirector == organization.keyDirector){
                positionId = await Position.findOne({namePosition: "Рукводящая должность"})
                dataUpdate.position = positionId._id
            } else {
                positionId = await Position.findOne({namePosition: "Исполняющая должность"})
                dataUpdate.position = positionId._id
            }
        }

        const userUpdate = await User.findByIdAndUpdate(req.params.idUser, dataUpdate,
            {
                new: true
            })

        res.json({
            userUpdate,
            message: "Вы успешно изменили данные"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить сотрудников"
        })
    }
}

