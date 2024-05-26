import User from '../models/User.js';
import Organization from "../models/Organization.js";

import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import Task from "../models/Task.js";
import Position from "../models/Position.js";

export const JWT_SECRET = "secret"

// Register user
export const register = async (req, res) => {
    try {
        const {fullName, email, password, keyOrganization, position, keyDirector, telegramUsername} = req.body;

        const isEmail = await User.findOne({email})
        if (isEmail) {
            return res.status(402).json({
                message: 'Данная электронная почта занята'
            })
        }

        console.log(keyDirector)

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let positionId;

        const organizationId = await Organization.findOne({key: keyOrganization})

        if (keyDirector == organizationId.keyDirector){
            positionId = await Position.findOne({namePosition: "Рукводящая должность"})
        } else {
            positionId = await Position.findOne({namePosition: "Исполняющая должность"})
        }

        console.log(positionId)

        const newUser = new User({
            fullName,
            email,
            password: hash,
            organization: organizationId._id,
            position: positionId._id,
            telegramUsername: telegramUsername
        })

        await newUser.save();
        await Organization.findByIdAndUpdate(organizationId._id, {
            $push: {personal: newUser},
        })

        res.json({
            newUser,
            message: "Регистрация прошла успешно.",
        })
    } catch (error) {
        console.log(error)
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user){
            return res.status(404).json({
                message: "Данного пользователя не существует."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
            JWT_SECRET,
            {expiresIn: "30d"})

        res.json({
            token,
            user,
            message: "Вы успешно вошли в систему."
        })
    } catch (error) {}
}

export const updateUser = async (req, res) => {
    try {
        const {email, fullName, birthday, address, phone} = req.body
        const user = await User.findByIdAndUpdate(req.userId, {
            fullName: fullName,
            email: email,
            birthday: birthday,
            address: address,
            phone: phone
        },
            {
                new: true
            })

        if (!user){
            return res.status(404).json({
                message: "Не удалось обновить данные"
            })
        }

        res.json({
            user,
            message: "Вы успешно изменили данные"
        })
    } catch (error) {}
}

// Information user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user){
            return res.status(404).json({
                message: "Данного пользователя не существует."
            })
        }

        const taskIds = user.tasks;
        const tasksPromises = await taskIds.map(taskId => Task.findById(taskId));
        const tasks = await Promise.all(tasksPromises);


        res.json({
            user,
            tasks
        })
    } catch (error) {
        res.status(403).json({
            message: "Нет доступа"
        })
    }
}

export const createPosition = async (req, res) => {
    try {
        const {namePosition} = req.body
        const newPosition = new Position({
            namePosition: namePosition
        })

        await newPosition.save();
    } catch (error) {
        res.status(403).json({
            message: "Нет доступа"
        })
    }
}

export const getPosition = async (req, res) => {
    try {

    } catch (error) {
        res.status(403).json({
            message: "Нет доступа"
        })
    }
}