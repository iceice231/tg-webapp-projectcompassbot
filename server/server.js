import express from 'express';
import mongoose from "mongoose";
import cors from "cors"
import authRoute from './routes/auth.js'
import projectRoute from './routes/project.js'

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute)
async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin@projectcompass.auw8uel.mongodb.net/?retryWrites=true&w=majority'
        )
        app.listen(3001, () => console.log('Server started'))
    } catch (error) {
        console.log(error)
    }
}
start();