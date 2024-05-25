import styles from './BlockTasks.module.scss'
import '../../assets/fonts/fonts.module.css'
import TaskItem from "../TaskItem/TaskItem";

function BlockTasks(props) {

    const {taskData, projectId, setErrorDeleteTask, position} = props



    return (
        <>
            <div className={styles["block-tasks"]}>
                <div className={styles["block-tasks__wrapper"]}>
                    { Array.isArray(taskData) ? taskData.map((task) => (
                        <TaskItem
                            setErrorDeleteTask={setErrorDeleteTask}
                            key={task._id}
                            taskData={task}
                            projectId={projectId}>
                            position={position}
                        </TaskItem>
                    )) : <TaskItem key={taskData._id} taskData={taskData} projectId={projectId}></TaskItem>
                    }

                </div>
            </div>

        </>
    );
}

export default BlockTasks;