import styles from './ProfilePage.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import BlockInfoUser from "../../components/BlockInfoUser/BlockInfoUser";
import {useEffect, useState} from "react";
import axios from "axios";
import BlockTaskUser from "../../components/BlockTaskUser/BlockTaskUser";

function ProfilePage() {

    const [isDataUser, setIsDataUser] = useState([])
    const [isTasks, setIsTasks] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/auth/profile`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setIsDataUser(response.data.user)
                setIsTasks(response.data.tasks)
                console.log(response.data)
            })
    }, [])

    return (
        <>
            <Header/>
            <div className={styles["profile__wrapper"]}>
                <BlockInfoUser dataUser={isDataUser}/>
                <h3 className={styles["profile-title-block"]}>Ваши задачи</h3>
                <BlockTaskUser dataTasks={isTasks}/>
            </div>
        </>
    );
}

export default ProfilePage;