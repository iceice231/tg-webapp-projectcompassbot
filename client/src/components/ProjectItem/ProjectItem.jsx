import styles from './ProjectItem.module.css'
import '../../assets/fonts/fonts.module.css'

import { FaArrowDown } from "react-icons/fa";
import {useEffect, useState} from 'react';

import { AiOutlineBars } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {Link} from "react-router-dom";




function ProjectItem(props) {
    const [isActive, setActive] = useState(false);
    const [isStatusStyle, setStatusStyle] = useState("")
    const {nameProject, projectId, status} = props

    useEffect(() => {
        if(status === "завершен") {
            setStatusStyle("status-completed")
        } else if (status === "в разработке") {
            setStatusStyle("status-develop")
        } else {
            setStatusStyle("status-paused")
        }
    }, [])


    const deleteProject = () => {
        axios.delete(`http://localhost:3001/api/project/${projectId}`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
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