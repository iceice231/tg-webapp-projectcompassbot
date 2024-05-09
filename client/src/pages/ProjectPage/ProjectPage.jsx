import styles from './ProjectPage.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import BlockInfoProject from "../../components/BlockInfoProject/BlockInfoProject";
import BlockTasks from "../../components/BlockTasks/BlockTasks";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {LuSettings2} from "react-icons/lu";


function ProjectPage() {

    const {id} = useParams()
    const [isDataTask, setIsDataTask] = useState([])
    const [isDataProject, setIsDataProject] = useState([])
    const [isFilesProject, setIsFilesProject] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/project/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then( ( response ) => {
                setIsDataProject(response.data.project)
                setIsDataTask(response.data.tasks)
                setIsFilesProject(response.data.files)
            } )
    }, [])

    return (
        <>
            <Header/>
            <div className={styles["project-page_wrapper"]}>
                <BlockInfoProject key={isDataProject._id} projectData={isDataProject} projectFiles={isFilesProject}/>
                <h3 className={styles["task-title"]}>Задачи проекта</h3>
                <div className={styles["group-btn-task"]}>
                    <button className={styles["btn__create-task"]}>Добавить</button>
                    <button className={styles["btn__filter-task"]}><LuSettings2/></button>
                </div>
                <BlockTasks taskData={isDataTask}></BlockTasks>
            </div>
        </>
    );
}

export default ProjectPage;