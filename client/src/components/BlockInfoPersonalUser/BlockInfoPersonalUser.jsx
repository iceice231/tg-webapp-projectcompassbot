import styles from './BlockInfoPersonal.module.scss'
import '../../assets/fonts/fonts.module.css'
import {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import ModalChangePersonalUser from "../ModalChangePersonalUser/ModalChangePersonalUser";
import {MdDelete} from "react-icons/md";
import axios from "axios";

function BlockInfoPersonalUser(props) {

    const {dataUser, position} = props

    const [isModalChangeDataUser, setIsModalChangeUser] = useState(false)
    const [isBirthday, setIsBirthday] = useState("")

    const apiUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        let dateBirthday = new Date(dataUser.birthday)
        if (dateBirthday) {
            let year = dateBirthday.getFullYear()
            let month = dateBirthday.getMonth()
            let day = dateBirthday.getDay()
            setIsBirthday(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    }, [dataUser])

    const deleteStaffUser = () => {
            axios.delete(`${apiUrl}/api/staff/user/delete/${dataUser._id}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
    }

    const showModalChangeDataUser = () => {
        setIsModalChangeUser(true);
    };
    const handleOkChangeDataUser = () => {
        setIsModalChangeUser(false);
    };
    const handleCancelChangeDataUser = () => {
        setIsModalChangeUser(false);
    };


    return (
        <>
            <div className={styles["block-info-user"]}>
                <div className={styles["block-info-user__wrapper"]}>
                    <h3 className={styles["block-info-user__name-user"]}>{dataUser.fullName}</h3>
                    <div className={styles["block-info-user__body"]}>
                        <p className={styles["block-info-user__body__phone"]}>Номер телефона: <b>{dataUser.phone}</b></p>
                        <p className={styles["block-info-user__body__email"]}>Электронная почта: <b>{dataUser.email}</b></p>
                        <p className={styles["block-info-user__body__address"]}>Адрес проживания: <b>{dataUser.address}</b></p>
                        <p className={styles["block-info-user__body__birthday"]}>Дата рождения: <b>{isBirthday}</b></p>
                        <p className={styles["block-info-user__body__position"]}>Должность: <b>{position}</b></p>
                        <p className={styles["block-info-user__body__telegram"]}>Telegram-ссылка:
                            <a href={`https://t.me/${dataUser.telegramUsername}`}>https://t.me/{dataUser.telegramUsername}</a>
                        </p>
                    </div>
                    <div className={styles["block-btn"]}>
                        <Button onClick={showModalChangeDataUser} className={styles["btn-change-info-user"]} type="primary">Изменить</Button>
                        <Button onClick={deleteStaffUser} className={styles["btn-delete-user"]} >Удалить</Button>
                    </div>
                    <Modal
                        open={isModalChangeDataUser}
                        onOk={handleOkChangeDataUser}
                        onCancel={handleCancelChangeDataUser}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalChangePersonalUser
                            closeOkModal={handleOkChangeDataUser}
                            closeCancelModal={handleCancelChangeDataUser}
                            dataUser={dataUser}
                        />
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default BlockInfoPersonalUser;