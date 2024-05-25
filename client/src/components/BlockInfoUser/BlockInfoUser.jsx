import styles from './BlockInfoUser.module.scss'
import '../../assets/fonts/fonts.module.css'
import {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import ModalChangeDataUser from "../ModalChangeDataUser/ModalChangeDataUser";

function BlockInfoUser(props) {

    const {dataUser} = props

    const [isModalChangeDataUser, setIsModalChangeUser] = useState(false)
    const [isBirthday, setIsBirthday] = useState("")

    useEffect(() => {
        let dateBirthday = new Date(dataUser.birthday)
        if (dateBirthday) {
            let year = dateBirthday.getFullYear()
            let month = dateBirthday.getMonth()
            let day = dateBirthday.getDay()
            setIsBirthday(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    }, [dataUser])

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
                    </div>
                    <Button onClick={showModalChangeDataUser} className={styles["btn-change-info-user"]} type="primary">Изменить</Button>
                    <Modal
                        open={isModalChangeDataUser}
                        onOk={handleOkChangeDataUser}
                        onCancel={handleCancelChangeDataUser}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalChangeDataUser
                            closeOkModal={handleOkChangeDataUser}
                            closeCancelModal={handleCancelChangeDataUser}
                            userId={dataUser._id}
                        />
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default BlockInfoUser;