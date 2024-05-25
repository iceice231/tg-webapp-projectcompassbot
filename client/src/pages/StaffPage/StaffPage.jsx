import styles from './StaffPage.module.scss'
import '../../assets/fonts/fonts.module.css'
import Header from '../../components/Header/Header.jsx'
import StaffList from "../../components/StaffList/StaffList";

function StaffPage() {

    return (
        <>
            <Header/>
            <div className={styles["staff-page__wrapper"]}>
                <h3 className={styles["staff-page__title"]}>Сотрудники</h3>
                <StaffList/>
            </div>
        </>
    );
}

export default StaffPage;