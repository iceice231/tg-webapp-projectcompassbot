import styles from './ReportItem.module.scss'
import '../../assets/fonts/fonts.module.css'
import {MdDelete} from "react-icons/md";
import {useEffect, useState} from "react";
import axios from "axios";


function ReportItem(props) {

    const {dataReports, setUpdate} = props

    const [isDateCompilation, setDateCompilation] = useState(undefined)
    const apiUrl = process.env.REACT_APP_BASE_URL
    useEffect(() => {
        let dateCompilation = new Date(dataReports.dateCompilation)
        if (dateCompilation){
            let year = dateCompilation.getFullYear()
            let month = dateCompilation.getMonth()
            let day = dateCompilation.getDay()
            setDateCompilation(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    }, [])

    const deleteReport = () => {
            axios.delete(`${apiUrl}/api/report/delete/${dataReports._id}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        setUpdate(true)
        setTimeout(function (){
            setUpdate(false)
        }, 1000)
    }


    return (
        <>
            <div className={styles["report-item"]}>
                <div className={styles["report-item__wrapper"]}>
                    <div className={styles["report-item__info"]}>
                        <h5 className={styles["report-item__info-name"]}>{dataReports.nameReport}</h5>
                        <p className={styles["report-item__info-date"]}>Дата составления: {isDateCompilation}</p>
                        <p className={styles["report-item__info-user"]}>Составитель: {dataReports.employee.fullName}</p>
                        <p className={styles["report-item__info-type"]}>Тип отчета: {dataReports.typeReport.nameTypeReport}</p>
                    </div>
                    <div className={styles["report-item__files"]}>
                        {dataReports.filesReport ? dataReports.filesReport.map((fileItem) => (
                            <a className={styles["report-item__files-item"]} href={`http://localhost:3001/${fileItem.urlPath}`}>{fileItem.nameFile}</a>
                        )) : null}
                    </div>
                    <button onClick={deleteReport} className={styles["btn-delete"]}><MdDelete className={styles["btn__icon"]}/>Удалить</button>
                </div>
            </div>
        </>
    );
}

export default ReportItem;