import styles from './ProjectItem.module.css'
import '../../assets/fonts/fonts.module.css'

import { FaArrowDown } from "react-icons/fa";
import {useEffect, useState} from 'react';

import { AiOutlineBars } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {Link} from "react-router-dom";
import {Alert} from "antd";




function ProjectItem(props) {
    const [isActive, setActive] = useState(false);
    const [isStatusStyle, setStatusStyle] = useState("")
    const {nameProject, projectId, status, namePosition, errorDeleteProject, setDateUpdate} = props
    const apiUrl = process.env.REACT_APP_BASE_URL
    useEffect(() => {
        if(status === "Завершен") {
            setStatusStyle("status-completed")
        } else if (status === "В разработке") {
            setStatusStyle("status-develop")
        } else {
            setStatusStyle("status-paused")
        }
    }, [])


    const deleteProject = () => {
        if(namePosition == "Рукводящая должность"){
            axios.delete(`${apiUrl}/api/project/${projectId}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) =>{
                setDateUpdate(true)
                setTimeout(function (){
                    setDateUpdate(false)
                }, 1000)
            })
        } else {
            errorDeleteProject(true)
            setTimeout(function () {
                errorDeleteProject(false)
            }, 3000)
        }

    }



    return (
      <>
          <div className={!isActive ? styles.projectItemClose__wrapper : styles.projectItemOpen__wrapper }>
            <div className={styles.projectItem__content}>
                <div className={styles.projectItem__info}>
                    <p className={styles[isStatusStyle]}>{status}</p>
                    <h2 className={styles[`name`]}>{nameProject}</h2>
                    <div className={styles.footer}>
                        <Link to={`/projects/${projectId}`}  className={styles.btn__detail}><AiOutlineBars className={styles.buttonIcon}/>Подробнее</Link>
                        <button onClick={deleteProject} className={styles.btn__delete}><MdDelete className={styles.buttonIcon}/>Удалить</button>
                    </div>
                </div>
                <button className={styles.arrowDown} onClick={() => {setActive(!isActive)}}><FaArrowDown /></button>
            </div>
        </div>
      </>
    );
}
  
export default ProjectItem;