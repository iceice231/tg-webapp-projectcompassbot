import React, {useEffect, useRef, useState} from "react";
import styles from './ModalChangeDataUser.module.scss'

import {Button, ConfigProvider, DatePicker, Input, InputNumber, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from 'dayjs';


function ModalChangeProject(props) {

    const {closeOkModal, closeCancelModal, userId} = props

    const [isFullName, setIsFullName] = useState(undefined)
    const [isBirthday, setIsBirthday] = useState(undefined)
    const [isNumberPhone, setIsNumberPhone] = useState(undefined)
    const [isEmail, setIsEmail] = useState(undefined)
    const [isAddress, setIsAddress] = useState(undefined)

    const handleBirthday = (date, dateString) => {
        setIsBirthday(dateString)
    };
    const handleFullName = (event) => {
        setIsFullName(event.target.value)
    }
    const handleNumberPhone = (event) => {
        setIsNumberPhone(event.target.value)
    }
    const handleEmail = (event) => {
        setIsEmail(event.target.value)
    }
    const handleAddress = (event) => {
        setIsAddress(event.target.value)
    }
    function changeDataUser() {
        const bodyRequest = {
            fullName: isFullName,
            birthday: isBirthday,
            email: isEmail,
            address: isAddress,
            phone: isNumberPhone,
        }

        axios.post("http://localhost:3001/api/auth/update", bodyRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
        closeOkModal();
    }

    return (
        <>
            <div className={styles["modal-create-project__wrapper"]}>
                <ConfigProvider
                    theme={{
                        components: {
                            DatePicker: {
                                colorPrimary: '#44d8ff',
                                algorithm: true,
                                fontFamily: 'NotoSansRegular',
                            },
                        }
                    }}>
                    <h3 className={styles["modal-create-project__title"]}>Изменение данных</h3>
                    <form className={styles["form-create-project"]}>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>ФИО</label>
                            <Input onChange={handleFullName} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата рождения</label>
                            <DatePicker onChange={handleBirthday} className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Номер телефона</label>
                            <Input onChange={handleNumberPhone} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Электронная почта</label>
                            <Input onChange={handleEmail} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Адрес проживания</label>
                            <Input onChange={handleAddress} className={styles["form-create-project__item-input"]}></Input>
                        </Space>

                    </form>
                    <div className={styles["modal-create-project__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={changeDataUser} type="primary">Изменить</Button>
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}
export default ModalChangeProject;

