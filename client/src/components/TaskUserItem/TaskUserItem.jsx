import styles from './TaskUserItem.module.scss'
import '../../assets/fonts/fonts.module.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa6";

function TaskUserItem(props) {

    const {taskItem} = props

    const [isStatusStyle, setIsStatusStyle] = useState(undefined)
    const [isPriorityStyle, setIsPriorityStyle] = useState(undefined)

    useEffect(() => {
        if(taskItem.status === "Завершен") {
            setIsStatusStyle("status-completed")
        } else if (taskItem.status === "В разработке") {
            setIsStatusStyle("status-develop")
        } else {
            setIsStatusStyle("status-paused")
        }

        if(taskItem.priority === "Высокий"){
            setIsPriorityStyle("task-priority-high")
        } else if(taskItem.priority === "Средний") {
            setIsPriorityStyle("task-priority-medium")
        } else {
            setIsPriorityStyle("task-priority-low")
        }
    }, [])

    return (
        <>
            <Link to={`/projects/${taskItem.project}/task/${taskItem._id}`} className={styles["task-link"]}>
                <div className={styles["block-tasks__wrapper"]}>
                    <div className={styles["block-tasks__item"]}>
                        <div className={styles["task-block-info"]}>
                            <p className={styles[isStatusStyle]}>{taskItem.status}</p>
                            <p className={styles[isPriorityStyle]}>{taskItem.priority}</p>
                        </div>
                        <div className={styles["task-body"]}>
                            <h3 className={styles["task-name"]}>{taskItem.nameTask}</h3>
                            <FaArrowRight />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default TaskUserItem;