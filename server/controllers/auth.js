import User from '../models/User.js';
import Organization from "../models/Organization.js";

import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const JWT_SECRET = "secret"

// Register user
export const register = async (req, res) => {
    try {
        const {fullName, phone, username, password, keyOrganization} = req.body;

        // Checking for the existence of this username
        const isUsedName = await User.findOne({username})
        if (isUsedName) {
            return res.status(402).json({
                message: 'Данный логин занят'
            })
        }

        // Checking for the existence of this phone
        const isUsedPhone = await  User.findOne({phone})
        if (isUsedPhone) {
            return res.status(402).json({
                message: 'Пользователь с данным телефон уже зарегистрирован'
            })
        }

        // Password encryption
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Finding an organization by key
        const organizationId = await Organization.findOne({key: keyOrganization})

        const newUser = new User({
            fullName,
            phone,
            username,
            password: hash,
            organization: organizationId._id,
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
        const {username, password} = req.body
        const user = await User.findOne({username})

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

// Information user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user){
            return res.status(404).json({
                message: "Данного пользователя не существует."
            })
        }

        const token = jwt.sign({
                id: user._id,
            },
            JWT_SECRET,
            {expiresIn: "30d"})

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.status(403).json({
            message: "Нет доступа"
        })
    }
}