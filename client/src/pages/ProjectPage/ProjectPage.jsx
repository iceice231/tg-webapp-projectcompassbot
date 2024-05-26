import styles from './ProjectPage.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import BlockInfoProject from "../../components/BlockInfoProject/BlockInfoProject";
import BlockTasks from "../../components/BlockTasks/BlockTasks";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {LuSettings2} from "react-icons/lu";
import {Alert, Modal} from "antd";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import ModalFilterTasks from "../../components/ModalFilterTasks/ModalFilterTasks";
import {IoCloseCircleOutline} from "react-icons/io5";


function ProjectPage() {

    const {id} = useParams()

    const [isDataTask, setIsDataTask] = useState([])
    const [isDataProject, setIsDataProject] = useState([])
    const [isFilesProject, setIsFilesProject] = useState([])
    const [isResponsible, setIsResponsible] = useState([])
    const [isPosition, setIsPosition] = useState(undefined)

    const [isClear, setIsClear] = useState(false)
    const [isUpdateData, setIsUpdateData] = useState(false)

    const [isErrorCreateTask, setIsErrorCreateTask] = useState(false)
    const [isErrorChangeProject, setIsErrorChangeProject] = useState(false)
    const [isErrorDeleteTask, setIsErrorDeleteTask] = useState(false)

    const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] = useState(false);
    const [isModalFilterTask, setIsModalFilterTask] = useState(false);

    const apiUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(`${apiUrl}/api/project/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then( ( response ) => {
                setIsDataProject(response.data.project)
                setIsDataTask(response.data.tasks)
                setIsFilesProject(response.data.files)
                setIsResponsible(response.data.userResponsible)
                setIsPosition(response.data.namePosition)
            } )
    },[isClear, isUpdateData])


    const showModalFilterTask = () => {
        setIsModalFilterTask(true);
    };
    const handleClearFilter = () => {
        setIsClear(false)
    }
    const handleOkFilterTask = () => {
        setIsModalFilterTask(false);
    };
    const handleCancelFilterTask = () => {
        setIsModalFilterTask(false);
    };

    const showModalCreateTask = () => {
        if(isPosition == "Рукводящая должность"){
            setIsModalCreateTaskOpen(true);
        } else {
            setIsErrorCreateTask(true)
            setTimeout(function () {
                setIsErrorCreateTask(false)
            }, 3000)
        }

    };
    const handleOkCreateTask = () => {
        setIsModalCreateTaskOpen(false);
    };
    const handleCancelCreateTask = () => {
        setIsModalCreateTaskOpen(false);
    };

    return (
        <>
            <Header/>
            <div className={styles["project-page_wrapper"]}>
                {isErrorCreateTask ?
                    <Alert className={styles["alert-error"]} message="У вам нет прав, чтобы добавить задачу" type="error" />
                    : null}
                {isErrorChangeProject ?
                    <Alert className={styles["alert-error"]} message="У вам нет прав, чтобы изменить данные проекта" type="error" />
                    : null}
                {isErrorDeleteTask ?
                    <Alert className={styles["alert-error"]} message="У вам нет прав, чтобы удалить задачу" type="error" />
                    : null}
                <BlockInfoProject
                    setUpdateData={setIsUpdateData}
                    key={isDataProject._id}
                    responsible={isResponsible}
                    projectData={isDataProject}
                    projectFiles={isFilesProject}
                    position={isPosition}
                    setErrorChangeProject={setIsErrorChangeProject}
                />
                <h3 className={styles["task-title"]}>Задачи проекта</h3>
                <div className={styles["group-btn-task"]}>
                    <button onClick={showModalCreateTask} className={styles["btn__create-task"]}>Добавить</button>
                    <Modal
                        open={isModalCreateTaskOpen}
                        onOk={handleOkCreateTask}
                        onCancel={handleCancelCreateTask}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalCreateTask
                            setUpdateData={setIsUpdateData}
                            closeOkModal={handleOkCreateTask}
                            closeCancelModal={handleCancelCreateTask}
                            idProject={isDataProject._id}
                        >
                        </ModalCreateTask>
                    </Modal>
                    <div className={styles["group-btn-filter"]}>
                        {isClear ? <button onClick={handleClearFilter} className={styles["btn-clear"]}>Очистить<IoCloseCircleOutline/></button> : null}
                        <button onClick={showModalFilterTask} className={styles["btn__filter-task"]}><LuSettings2/></button>
                    </div>
                    <Modal
                        open={isModalFilterTask}
                        onOk={handleOkFilterTask}
                        onCancel={handleCancelFilterTask}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalFilterTasks
                            closeOkModal={handleOkFilterTask}
                            closeCancelModal={handleCancelFilterTask}
                            setData={setIsDataTask}
                            idProject={isDataProject._id}
                            setClear={setIsClear}
                        >
                        </ModalFilterTasks>
                    </Modal>
                </div>
                <BlockTasks
                    position={isPosition}
                    setErrorDeleteTask={setIsErrorDeleteTask}
                    taskData={isDataTask}
                    projectId={isDataProject._id}
                    setData={setIsUpdateData}>
                </BlockTasks>
            </div>
        </>
    );
}

export default ProjectPage;