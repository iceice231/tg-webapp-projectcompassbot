import styles from './BlockInfoProject.module.scss'
import '../../assets/fonts/fonts.module.css'
import {Button, ConfigProvider, Modal, Space} from "antd";
import {useEffect, useState} from "react";
import ModalChangeProject from "../ModalChangeProject/ModalChangeProject";



function BlockInfoProject(props) {

    const {projectData, projectFiles, responsible, position, setErrorChangeProject, setUpdateData} = props

    const [isDateStart, setIsDateStart] = useState(null)
    const [isDateEnd, setIsDateEnd] = useState(null)

    const [isModalUpdateProjectOpen, setIsModalUpdateProjectOpen] = useState(false);

    useEffect(() => {
        let dateStart = new Date(projectData.dateStart)
        let dateEnd = new Date(projectData.dateEnd)
        if (dateStart) {
            let year = dateStart.getFullYear()
            let month = dateStart.getMonth() + 1
            let day = dateStart.getDate();
            setIsDateStart(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
        if(dateEnd){
            let year = dateEnd.getFullYear()
            let month = dateEnd.getMonth() + 1
            let day = dateEnd.getDate()
            setIsDateEnd(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    }, [])

    const showModalUpdateProject = () => {
        if(position == "Рукводящая должность"){
            setIsModalUpdateProjectOpen(true);
        } else {
            setErrorChangeProject(true)
            setTimeout(function () {
                setErrorChangeProject(false)
            }, 3000)
        }

    };
    const handleOkUpdateProject = () => {
        setIsModalUpdateProjectOpen(false);
    };
    const handleCancelUpdateProject = () => {
        setIsModalUpdateProjectOpen(false);
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
                            <a href={`https://t.me/${responsible.telegramUsername}"`}>{responsible.fullName}</a>
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
                    <div className={styles["block-info-project__footer"]}>
                        <Button onClick={showModalUpdateProject} type="primary" className={styles["btn-change"]}>Изменить</Button>
                    </div>
                    <Modal
                        open={isModalUpdateProjectOpen}
                        onOk={handleOkUpdateProject}
                        onCancel={handleCancelUpdateProject}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalChangeProject
                            setUpdateData={setUpdateData}
                            closeOkModal={handleOkUpdateProject}
                            closeCancelModal={handleCancelUpdateProject}
                            projectData={projectData}
                            projectFiles={projectFiles}
                        >
                        </ModalChangeProject>
                    </Modal>
                </div>
            </div>
            </ConfigProvider>
        </>
    );
}

export default BlockInfoProject;