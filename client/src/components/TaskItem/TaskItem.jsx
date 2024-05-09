import styles from './TaskItem.module.scss'
import '../../assets/fonts/fonts.module.css'
import {AiOutlineBars} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {FaArrowDown} from "react-icons/fa";
import {useEffect, useState} from "react";

function TaskItem(props) {

    const {taskData} = props
    const [isStatusStyle, setStatusStyle] = useState("")
    const [isPriorityStyle, setIsPriorityStyle] = useState("")
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if(taskData.status === "Завершен") {
            setStatusStyle("status-completed")
        } else if (taskData.status === "В разработке") {
            setStatusStyle("status-develop")
        } else {
            setStatusStyle("status-paused")
        }

        if(taskData.priority === "Высокий"){
            setIsPriorityStyle("task-priority-high")
        } else if(taskData.priority === "Средний") {
            setIsPriorityStyle("task-priority-medium")
        } else {
            setIsPriorityStyle("task-priority-low")
        }
    }, [])

    return (
        <>
            <div className={!isActive ? styles["task-item-close__wrapper"] : styles["task-item-open_wrapper"] }>
                <div className={styles["task-item__content"]}>
                    <div className={styles["task-item__info"]}>
                        <div className={styles["task-item__top"]}>
                            <p className={styles[isStatusStyle]}>{taskData.status}</p>
                            <p className={styles[isPriorityStyle]}>{taskData.priority}</p>
                        </div>
                        <h2 className={styles["task-name"]}>{taskData.nameTask}</h2>
                        <div className={styles["task-item__footer"]}>
                            <button className={styles["btn-detail"]}><AiOutlineBars className={styles["btn__icon"]}/>Подробнее</button>
                            <button  className={styles["btn-delete"]}><MdDelete className={styles["btn__icon"]}/>Удалить</button>
                        </div>
                    </div>
                    <button className={styles["arrow-down"]} onClick={() => {setIsActive(!isActive)}}><FaArrowDown /></button>
                </div>
            </div>
        </>
    );
}

export default TaskItem;