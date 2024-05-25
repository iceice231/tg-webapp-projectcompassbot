import styles from './TaskPage.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import BlockInfoTask from "../../components/BlockInfoTask/BlockInfoTask";
import BlockTechnicalFiles from "../../components/BlockTechnicalFiles/BlockTechnicalFiles";
import BlockCommentsTasks from "../../components/BlockCommetsTasks/BlockCommetsTasks";
import commentItem from "../../components/CommentItem/CommentItem";
import {Alert} from "antd";

function TaskPage() {

    const {id, idTask} = useParams()

    const [isDataTask, setIsDataTask] = useState([])
    const [isFilesDocuments, setIsFilesDocuments] = useState([])
    const [isFilesTechnical, setIsFilesTechnical] = useState([])
    const [isCommentTask, setIsCommentTask] = useState([])
    const [isResponsible, setIsResponsible] = useState([])
    const [isPosition, setIsPosition] = useState(undefined)

    const [isErrorChangeTask, setIsErrorChangeTask] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3001/api/project/${id}/task/${idTask}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then( ( response ) => {
                setIsDataTask(response.data.task)
                setIsFilesDocuments(response.data.files)
                setIsFilesTechnical(response.data.filesTechnical)
                setIsCommentTask(response.data.comment)
                setIsResponsible(response.data.userResponsible)
                setIsPosition(response.data.namePosition)
                if(idTask != undefined) {
                    axios.get(`http://localhost:3001/api/project/task/${idTask}/comment/all`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then((response) => {
                            setIsCommentTask(response.data.comments)
                            console.log(response.data)
                        })
                }
            } )

    },[])

    return (
        <>
            <Header/>
            {isErrorChangeTask ?
                <Alert className={styles["alert-error"]} message="У вам нет прав, чтобы изменить данные задачи" type="error" />
                : null}
            <div className={styles["task-page__wrapper"]}>
                <BlockInfoTask
                    key={isDataTask._id}
                    userResponsible={isResponsible}
                    dataTask={isDataTask}
                    dateFilesDocuments={isFilesDocuments}
                    position={isPosition}
                    setErrorChangeTask={setIsErrorChangeTask}
                />
                <BlockTechnicalFiles key={isDataTask._id} projectId={id} taskId={idTask} filesTechnical={isFilesTechnical}/>
                <BlockCommentsTasks taskId={isDataTask._id} dataComments={isCommentTask}/>
            </div>
        </>
    );
}

export default TaskPage;