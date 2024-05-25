import styles from './BlockInfoTask.module.scss'
import '../../assets/fonts/fonts.module.css'
import {Button, ConfigProvider, Modal, Space} from "antd";
import {useEffect, useState} from "react";
import ModalChangeProject from "../ModalChangeProject/ModalChangeProject";
import ModalChangeTask from "../ModalChangeTask/ModalChangeTask";



function BlockInfoProject(props) {

    const {dataTask, dateFilesDocuments, userResponsible, position, setErrorChangeTask} = props

    const [isDateStart, setIsDateStart] = useState(null)
    const [isDateEnd, setIsDateEnd] = useState(null)

    const [isModalUpdateTaskOpen, setIsModalUpdateTaskOpen] = useState(false)


    useEffect(() => {
        let dateStart = new Date(dataTask.dateStart)
        let dateEnd = new Date(dataTask.dateEnd)
        if (dateStart){
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

    const showModalUpdateTask = () => {
        if(position == "Рукводящая должность"){
            setIsModalUpdateTaskOpen(true);
        } else {
            setErrorChangeTask(true)
            setTimeout(function (){
                setErrorChangeTask(false)
            }, 3000)
        }

    };
    const handleOkUpdateTask = () => {
        setIsModalUpdateTaskOpen(false);
    };
    const handleCancelUpdateTask = () => {
        setIsModalUpdateTaskOpen(false);
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            fontFamily: 'NotoSansRegular',
                            colorPrimary: "#44d8ff"
                        }
                    }
                }}>
                <div className={styles["block-info-project"]}>
                    <div className={styles["block-info-project__wrapper"]}>
                        <h2 className={styles["block-info-project__name-project"]}>{dataTask.nameTask}</h2>
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
                                <p className={styles["body-info__responsible"]}>Ответсвтенный: </p>
                                <a href="https://t.me/PashkaD5">{userResponsible.fullName}</a>
                            </Space>
                            <p className={styles["body-info__status"]}>Статус задачи: {dataTask.status}<span></span></p>
                            <p className={styles["body-info__status"]}>Приоритет задачи: {dataTask.status}<span></span></p>
                            <Space className={styles["block-info-project__block-description"]}>
                                <p className={styles["body-info__description"]}>Описание задачи: </p>
                                <p className={styles["body-info__description-text"]}>{dataTask.description}</p>
                            </Space>
                            <Space direction="vertical">
                                <p className={styles[""]}>Регламентирующие файлы:</p>
                                <Space className={styles["files-projects"]}>
                                    { dateFilesDocuments ? dateFilesDocuments.map((file) => (
                                        <a href={`http://localhost:3001/${file.urlPath}`}>{file.nameFile}</a>
                                    )) : null
                                    }
                                </Space>
                            </Space>
                        </div>
                        <div className={styles["block-info-project__footer"]}>
                            <Button onClick={showModalUpdateTask} type="primary" className={styles["btn-change"]}>Изменить</Button>
                        </div>
                        <Modal
                            open={isModalUpdateTaskOpen}
                            onOk={handleOkUpdateTask}
                            onCancel={handleCancelUpdateTask}
                            footer={(_, {OkBtn, CancelBtn}) => (
                                <>
                                </>)}>
                            <ModalChangeTask
                                closeOkModal={handleOkUpdateTask}
                                closeCancelModal={handleCancelUpdateTask}
                                taskData={dataTask}
                                taskFiles={dateFilesDocuments}
                            >
                            </ModalChangeTask>
                        </Modal>
                    </div>
                </div>
            </ConfigProvider>
        </>
    );
}

export default BlockInfoProject;