import jwt from "jsonwebtoken";

import {JWT_SECRET} from "../controllers/auth.js";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token){
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.status(403).json({
                message: "У вас нет доступа"
            })
        }
    } else {
        return res.status(403).json({
            message: "У вас нет доступа"
        })
    }
}