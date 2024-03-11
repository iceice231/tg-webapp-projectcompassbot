import styles from './ProjectItem.module.css'
import '../../assets/fonts/fonts.module.css'

import { FaArrowDown } from "react-icons/fa";
import { useState } from 'react';

import { AiOutlineBars } from "react-icons/ai";
import { MdDelete } from "react-icons/md";




function ProjectItem(props) {
    const [isActive, setActive] = useState(false);
    console.log(props)
    const {nameProject} = props
    return (
      <>
        <div className={!isActive ? styles.projectItemClose__wrapper : styles.projectItemOpen__wrapper }>
            <div className={styles.projectItem__content}>
                <div className={styles.projectItem__info}>
                    <h5 className={styles.status}>Завершён</h5>
                    <h2 className={styles.name}>{nameProject}</h2>
                    <div className={styles.footer}>
                        <button className={styles.btn__detail}><AiOutlineBars className={styles.buttonIcon}/>Подробнее</button>
                        <button className={styles.btn__delete}><MdDelete className={styles.buttonIcon}/>Удалить</button>
                    </div>
                </div>
                <button className={styles.arrowDown} onClick={() => {setActive(!isActive)}}><FaArrowDown /></button>
            </div>
        </div>
        
      </>
    );
}
  
export default ProjectItem;