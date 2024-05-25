import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import File from "../models/File.js";


export const createComment = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const {textComment, taskId} = req.body

        console.log(taskId)

        const newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
        })
        await newFile.save();
        const files = await File.findOne({nameFile: req.file.originalname})

        const newComment = new Comment({
            user: user._id,
            userName: user.fullName,
            task: taskId,
            textComment: textComment,
            files: [files._id]
        })

        await newComment.save();
        await Task.findByIdAndUpdate(taskId, {
            $push: {comment: newComment},
        })
        res.status(200).json({
            message: "Комментарий успешно создан",
        })
    } catch (error){
        res.status(400).json({
            message: "Не удалось создать комментарий"
        })
    }
}

export const getComments = async (req, res) => {
    try {

        const task = await Task.findById(req.params.idTask)

        const commentsIds = task.comment
        const commentsPromises = commentsIds.map(async commentId => {
            const comment = await Comment.findById(commentId);
            const filesIds = await comment.files
            const filesPromises = await filesIds.map(fileId => File.findById(fileId))
            const files = await Promise.all(filesPromises)
            return { comment, files };
        });
        const comments = await Promise.all(commentsPromises);

        res.status(200).json({
            comments,
            message: "Комментарии получены",
        })
    } catch (error){
        res.status(400).json({
            message: "Не удалось получить комментарии"
        })
    }
}
