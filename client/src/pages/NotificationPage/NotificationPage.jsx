import styles from './NotificationPage.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import {Button, DatePicker, Select, Space} from "antd";
import React, {useState} from "react";
import axios from "axios";

function NotificationPage() {

    const [isStatusNotification, setIsStatusNotification] = useState(undefined)
    const [isStatusSuspend, setIsStatusSuspend] = useState(undefined)
    const [isDateSuspend, setIsDateSuspend] = useState(undefined)

    const updateSettingNotification = () => {
        const bodyRequest = {
            status: isStatusNotification,
            dateStatus: isStatusSuspend,
            dateSuspend: isDateSuspend
        }
        axios.post(`http://localhost:3001/api/notification/setting`, bodyRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
    }


    const handleStatusNotificationChange = (event) => {
        setIsStatusNotification(event)
    }

    const handleStatusSuspendChange = (event) => {
        setIsStatusSuspend(event)
    }

    const handleDateSuspendChange = (date, dateString) => {
        setIsDateSuspend(dateString)
    }


    return (
        <>
            <Header/>
            <div className={styles["notification-page__wrapper"]}>
                <h2 className={styles["notification-page__title"]}>Уведомления</h2>
                <div className={styles["notification-page__body"]}>
                    <Space direction="vertical" className={styles["form-create-project__item"]}>
                        <label>Вкл/выкл уведомления</label>
                        <Select
                            onChange={(event) => handleStatusNotificationChange(event)}
                            className={styles["form-create-project__item-select]"]}
                            defaultValue="Включить"
                            style={{width: 170}}
                            options={[
                                {
                                    value: 'true',
                                    label: 'Включить'
                                },
                                {
                                    value: 'false',
                                    label: 'Выключить'
                                },
                            ]}
                        />
                    </Space>
                    <Space direction="vertical" className={styles["form-create-project__item"]}>
                        <label>Приостановить уведомления</label>
                        <Select
                            onChange={(event) => handleStatusSuspendChange(event)}
                            className={styles["form-create-project__item-select]"]}
                            defaultValue="Приостановить"
                            style={{width: 170}}
                            options={[
                                {
                                    value: 'true',
                                    label: 'Приостановить'
                                },
                                {
                                    value: 'false',
                                    label: 'Возобновить'
                                },
                            ]}
                        />
                    </Space>
                    { isStatusSuspend ? <Space className={styles["form-create-project__item"]} direction="vertical">
                        <label>Приостановить до</label>
                        <DatePicker onChange={handleDateSuspendChange} colorBorder="#fff" className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                    </Space>
                        : null
                    }
                    <Button onClick={updateSettingNotification} type="primary">Сохранить</Button>
                </div>
            </div>
        </>
    );
}

export default NotificationPage;