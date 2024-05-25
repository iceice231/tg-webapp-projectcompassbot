import File from "../models/File.js";
import User from "../models/User.js";
import TypeReport from "../models/TypeReport.js";
import Report from "../models/Report.js";
import Project from "../models/Project.js";


export const createReport = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const {nameReport, dateCompilation, typeReport, employee} = req.body;

        const newFile = new File({
            nameFile: req.file.originalname,
            urlPath: req.file.path
        })

        await newFile.save();
        const files = await File.findOne({nameFile: req.file.originalname})

        const type = await TypeReport.findOne({nameTypeReport: typeReport})

        const userResponsible = await User.findOne({fullName: employee})

        const newReport = new Report({
            nameReport,
            dateCompilation,
            typeReport: type._id,
            employee: userResponsible._id,
            filesReport: [files._id],
            organization: user.organization
        })

        await newReport.save();

        res.json({
            message: "Отчет успешно добавлен",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось добавить отчет"
        })
    }
}

export const getAllReport = async (req, res) => {
    try {
        const user = await User.findById(req.userId)


        if(!user){
            return res.status(400).json({
                   message:"Ошибка"
            })
        }
        let reports = await Report.find({ organization: user.organization })
            .populate('typeReport')
            .populate('filesReport')
            .populate('employee');


        res.json({
            reports,
            message: "Отчеты умпешно получены",
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить отчеты"
        })
    }
}

export const findReports = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const { nameReport, dateCompilation, typeReport, employee } = req.body;

        let filter = { organization: user.organization };

        if (nameReport !== undefined) {
            filter.nameReport = nameReport;
        }
        if (dateCompilation !== undefined) {
            filter.dateCompilation = dateCompilation;
        }

        let typeReports, userEmployee;

        if (typeReport !== undefined) {
            typeReports = await TypeReport.findOne({ nameTypeReport: typeReport });
            if (typeReports) {
                filter.typeReport = typeReports._id;
            }
        }

        if (employee !== undefined) {
            userEmployee = await User.findOne({ fullName: employee });
            if (userEmployee) {
                filter.employee = userEmployee._id;
            }
        }

        let reports = await Report.find(filter)
            .populate('typeReport')  // Пополняем поле typeReport
            .populate('filesReport') // Пополняем поле filesReport
            .populate('employee');   // Пополняем поле employee

        res.json({
            reports,
            message: "Отчеты умпешно получены",
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить отчеты"
        })
    }
}

export const deleteReport = async (req, res) => {
    try {   
        const report = await Report.findByIdAndDelete(req.params.idReport)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не удалось получить отчеты"
        })
    }
}