import express from 'express';
import mongoose from "mongoose";
import cors from "cors"
import authRoute from './routes/auth.js'
import projectRoute from './routes/project.js'
import reportRoute from './routes/report.js'
import staffRoute from './routes/staff.js'
import notificationRoute from './routes/notification.js'
import 'dotenv/config.js'
import './loadEnv.js'


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}));
app.use('/uploads', express.static('./uploads'))
app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute)
app.use('/api/report', reportRoute)
app.use('/api/staff', staffRoute)
app.use('/api/notification', notificationRoute)
async function start() {
    console.log(process.env.MONGODB_URI)
    try {
        await mongoose.connect(
            process.env.MONGODB_URI
        )
        app.listen(3001, () => console.log('Сервер успешно запущен'))
    } catch (error) {
        console.log(error)
    }
}
start();