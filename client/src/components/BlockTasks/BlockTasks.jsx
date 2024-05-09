import styles from './BlockTasks.module.scss'
import '../../assets/fonts/fonts.module.css'
import TaskItem from "../TaskItem/TaskItem";

function BlockTasks(props) {

    const {taskData} = props



    return (
        <>
            <div className={styles["block-tasks"]}>
                <div className={styles["block-tasks__wrapper"]}>
                    { taskData ? taskData.map((task) => (
                        <TaskItem key={task._id} taskData={task}></TaskItem>
                    )) : null
                    }

                </div>
            </div>

        </>
    );
}

export default BlockTasks;