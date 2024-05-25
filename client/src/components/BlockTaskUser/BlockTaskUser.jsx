import styles from './BlockTaskUser.module.scss'
import '../../assets/fonts/fonts.module.css'
import TaskUserItem from "../TaskUserItem/TaskUserItem";

function BlockTaskUser(props) {

    const {dataTasks} = props

    return (
        <>
            <div className={styles["block-tasks"]}>
                {dataTasks ? dataTasks.map((taskItem) => (
                    <TaskUserItem taskItem={taskItem}/>
                )): null}
            </div>

        </>
    );
}

export default BlockTaskUser;