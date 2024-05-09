import styles from './BlockInfoProject.module.scss'
import '../../assets/fonts/fonts.module.css'
import {Space} from "antd";
import {useEffect, useState} from "react";



function BlockInfoProject(props) {

    const {projectData, projectFiles} = props
    const [isDateStart, setIsDateStart] = useState(null)
    const [isDateEnd, setIsDateEnd] = useState(null)

    useEffect(() => {
        let dateStart = new Date(projectData.dateStart)
        let dateEnd = new Date(projectData.dateEnd)
        if (dateStart) {
            let year = dateStart.getFullYear()
            let month = dateStart.getMonth()
            let day = dateStart.getDay()
            setIsDateStart(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
        if(dateEnd){
            let year = dateEnd.getFullYear()
            let month = dateEnd.getMonth()
            let day = dateEnd.getDay()
            setIsDateEnd(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    }, [])

    return (
        <>
            <div className={styles["block-info-project"]}>
                <div className={styles["block-info-project__wrapper"]}>
                    <h2 className={styles["block-info-project__name-project"]}>{projectData.nameProject}</h2>
                    <div className={styles["block-info-project__body-info"]}>
                        <Space className={styles["block-info-project__block-date"]}>
                            <div className={styles["body-info__date-start"]}>
                                <p>Дата старта: </p>
                                <span className={styles["date-start"]}>
                                    {isDateStart}
                                </span>
                            </div>
                            <div className={styles["body-info__date-end"]}>
                                <p>Дата завершения: </p>
                                <span className={styles["date-end"]}>
                                    {isDateEnd}
                                </span>
                            </div>
                        </Space>
                        <Space>
                            <p className={styles["body-info__responsible"]}>Руководитель: </p>
                            <a href="https://t.me/PashkaD5">Иванов Иван Иванович</a>
                        </Space>
                        <p className={styles["body-info__status"]}>Статус проекта: {projectData.status}<span></span></p>
                        <p className={styles["body-info__budget"]}>Бюджет: {projectData.budget}<span></span></p>
                        <Space className={styles["block-info-project__block-description"]}>
                            <p className={styles["body-info__description"]}>Описание проекта: </p>
                            <p className={styles["body-info__description-text"]}>{projectData.description}</p>
                        </Space>
                        <Space direction="vertical">
                            <p className={styles[""]}>Файлы проекта</p>
                            <Space className={styles["files-projects"]}>
                                { projectFiles ? projectFiles.map((file) => (
                                  <a href={`http://localhost:3001/${file.urlPath}`}>{file.nameFile}</a>
                                )) : null
                                }
                            </Space>
                        </Space>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlockInfoProject;