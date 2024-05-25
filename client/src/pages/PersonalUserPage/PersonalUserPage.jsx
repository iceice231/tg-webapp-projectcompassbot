import styles from './PersonalUserPage.module.scss'
import '../../assets/fonts/fonts.module.css'
import BlockInfoPersonalUser from "../../components/BlockInfoPersonalUser/BlockInfoPersonalUser";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import BlockTaskUser from "../../components/BlockTaskUser/BlockTaskUser";


function PersonalUserPage() {
    const {idUser} = useParams()
    
    const [isDataUser, setIsDataUser] = useState([])
    const [isDataTasksUser, setIsDataTasksUser] = useState([])
    const [isPosition, setIsPosition] = useState([])

    const apiUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(`${apiUrl}/api/staff/user/${idUser}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                setIsDataUser(response.data.user)
                setIsDataTasksUser(response.data.tasks)
                setIsPosition(response.data.user.position.namePosition)
            } )
    }, [])
    return (
        <>
            <Header/>
            <div className={styles["personal-user-page__wrapper"]}>
                <BlockInfoPersonalUser dataUser={isDataUser} position={isPosition}/>
                <h3 className={styles["personal-user-page__title-task"]}>Задачи сотрудника</h3>
                <BlockTaskUser dataTasks={isDataTasksUser}/>
            </div>
        </>
    );
}

export default PersonalUserPage;