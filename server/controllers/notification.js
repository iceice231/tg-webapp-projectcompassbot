import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Notification from "../models/Notification.js";

export const updateNotification = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const {status, dateSuspend, dateStatus} = req.body
        console.log(req.body)
        let setting = {}

        let statusNotification;
        let dateStatusNotification;

        const notification = await Notification.findOne({user: req.userId})
        if(!notification){
            if(status == "true"){
                statusNotification = true
            } else {
                statusNotification = false
            }
            if(dateStatus == "true"){
                dateStatusNotification = true
            } else {
                dateStatusNotification = false
            }
            const newNotification = new Notification({
                status: statusNotification,
                dateStatus: dateStatusNotification,
                dateSuspend: dateSuspend,
                user: req.userId
            })
            await newNotification.save()
        }

        if(status !== undefined){
            if(status == "true"){
                statusNotification = true
            } else {
                statusNotification = false
            }
            setting.status = statusNotification
        }
        if(dateStatusNotification !== undefined){
            if(dateStatus == "true"){
                dateStatusNotification = true
            } else {
                dateStatusNotification = false
            }
            setting.dateStatus = dateStatusNotification
            setting.dateSuspend = dateSuspend
        }

        const updateNotification = await Notification.findOneAndUpdate({user: req.userId}, setting)

        res.json({
            message: "Настройки успешно сохранены",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось сохранить настройки"
        })
    }
}