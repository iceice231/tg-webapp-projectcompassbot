import styles from './StaffItem.module.scss'
import '../../assets/fonts/fonts.module.css'
import {Link} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";


function StaffItem(props) {

    const {dataUser} = props

    return (
        <>
            <Link to={`/staff/user/${dataUser._id}`} className={styles["staff-user__link"]}>
                <div className={styles["staff-item"]}>
                    <div className={styles["staff-item__wrapper"]}>
                        <h2 className={styles["staff-name"]}>{dataUser.fullName}</h2>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
        </>
    );
}

export default StaffItem;