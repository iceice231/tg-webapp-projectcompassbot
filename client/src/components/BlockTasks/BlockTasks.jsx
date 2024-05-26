import styles from './BlockTasks.module.scss'
import '../../assets/fonts/fonts.module.css'
import TaskItem from "../TaskItem/TaskItem";

function BlockTasks(props) {

    const {taskData, projectId, setErrorDeleteTask, position, setData} = props



    return (
        <>
            <div className={styles["block-tasks"]}>
                <div className={styles["block-tasks__wrapper"]}>
                    { Array.isArray(taskData) ? taskData.map((task) => (
                        <TaskItem
                            setData={setData}
                            setErrorDeleteTask={setErrorDeleteTask}
                            key={task._id}
                            taskData={task}
                            projectId={projectId}
                            position={position}>

                        </TaskItem>
                    )) :
                        <TaskItem
                            setData={setData}
                            key={taskData._id}
                            taskData={taskData}
                            projectId={projectId}
                            position={position}>
                        </TaskItem>
                    }

                </div>
            </div>

        </>
    );
}

export default BlockTasks;