import styles from './StaffList.module.scss'
import '../../assets/fonts/fonts.module.css'
import StaffItem from "../StaffItem/StaffItem";
import {useEffect, useState} from "react";
import axios from "axios";


function StaffList() {

    const [isDataStaff, setIsDataStaff] = useState([])

    const apiUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(`${apiUrl}/api/staff/all`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                setIsDataStaff(response.data)
            } )
    }, [])

    return (
        <>
            <div className={styles["staff-list"]}>
                {isDataStaff.personal ? isDataStaff.personal.map((userItem) => (<StaffItem dataUser={userItem}/>))
                    : null
                }
            </div>
        </>
    );
}

export default StaffList;