import express from 'express';
import mongoose from "mongoose";
import cors from "cors"
import multer from "multer";
import authRoute from './routes/auth.js'
import projectRoute from './routes/project.js'
import 'dotenv/config.js'
import { config } from "dotenv";
import './loadEnv.js'


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}));
app.use('/uploads', express.static('./uploads'))
app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute)
async function start() {
    console.log(process.env.MONGODB_URI)
    try {
        await mongoose.connect(
            // 'mongodb+srv://admin:admin@projectcompass.auw8uel.mongodb.net/?retryWrites=true&w=majority'
            process.env.MONGODB_URI
        )
        app.listen(3001, () => console.log('Сервер успешно запущен'))
    } catch (error) {
        console.log(error)
    }
}
start();