import React, {useEffect, useState} from "react";
import styles from './ModalCreateTask.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, DatePicker, Input, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";


function ModalCreateTask(props) {
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [isDateEnd, setIsDateEnd] = useState(null)
    const [isNameTask, setIsNameTask] = useState(null);
    const [isPriority, setIsPriority] = useState("Низкий");
    const [isStatus, setIsStatus] = useState("В разработке");
    const [isDescription, setIsDescription ] = useState(null)
    const [isFile, setIsFile] = useState(null)
    const [isResponsible, setIsResponsible] = useState(undefined)

    useEffect(() => {

    }, [])


    const fd = new FormData()

    const {closeOkModal, closeCancelModal, idProject, setUpdate} = props

    const handleDateStartChange = (date, dateString) => {
        setSelectedDateStart(dateString)
    };

    const handleDateEndChange = (date, dateString) => {
        setIsDateEnd(dateString)
    }

    const handleNameTaskChange = (event) => {
        setIsNameTask(event.target.value)
    }

    const handleResponsibleChange = (event) => {
        setIsResponsible(event.target.value)
    }

    const handlePriorityChange = (event) => {
        setIsPriority(event)
    }

    const handleStatusChange = (event) => {
        setIsStatus(event)
    }

    const handleDescriptionChange = (event) => {
        setIsDescription(event.target.value)
    }

    const handleFileDocumetsChange = (file) => {
        setIsFile(file.file.originFileObj);
    }

    function createTask() {
        const bodyRequest = {
            nameTask: isNameTask,
            dateStart: selectedDateStart,
            dateEnd: isDateEnd,
            priority: isPriority,
            status: isStatus,
            description: isDescription,
            responsible: isResponsible
        }

        fd.append('isFile', isFile);
        Object.entries(bodyRequest).forEach(([k, v]) => fd.append(k, v))
        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }

        axios.post(`http://localhost:3001/api/project/${idProject}/task/create`, fd, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function (response) {
                fd.delete("nameTask")
                fd.delete("dateStart")
                fd.delete("dateEnd")
                fd.delete("priority")
                fd.delete("status")
                fd.delete("description")
                fd.delete("responsible")
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
        closeOkModal();
        setUpdate(true)
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
                            InputNumber: {
                                colorPrimary: '#44d8ff',
                            },
                            Select: {
                                colorPrimary: '#44d8ff',
                                fontFamily: 'NotoSansRegular',
                            },
                            Upload: {
                                colorPrimary: '#44d8ff',
                                actionsColor: '#44d8ff',
                            }
                        }
                    }}>
                    <h3 className={styles["modal-create-project__title"]}>Создание задачи</h3>
                    <form className={styles["form-create-project"]}>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Название задачи</label>
                            <Input onChange={handleNameTaskChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата начала</label>
                            <DatePicker onChange={handleDateStartChange} className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата заверщения</label>
                            <DatePicker onChange={handleDateEndChange}  colorBorder="#fff" className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Исполняющий</label>
                            <Input onChange={handleResponsibleChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]}>
                            <label>Статус</label>
                            <Select
                                onChange={(event) => handleStatusChange(event)}
                                className={styles["form-create-project__item-select]"]}
                                defaultValue="В разработке"
                                style={{width: 170}}
                                options={[
                                    {
                                        value: 'В разработке',
                                        label: 'В разработке'
                                    },
                                    {
                                        value: 'Приостановлен',
                                        label: 'Приостановлен'
                                    },
                                    {
                                        value: 'Завершен',
                                        label: 'Завершен'
                                    }
                                ]}
                            />
                        </Space>
                        <Space className={styles["form-create-project__item"]}>
                            <label>Приоритет</label>
                            <Select
                                onChange={(event) => handlePriorityChange(event)}
                                className={styles["form-create-project__item-select]"]}
                                defaultValue="Низкий"
                                style={{width: 170}}
                                options={[
                                    {
                                        value: 'Высокий',
                                        label: 'Высокий'
                                    },
                                    {
                                        value: 'Средний',
                                        label: 'Средний'
                                    },
                                    {
                                        value: 'Низкий',
                                        label: 'Низкий'
                                    }
                                ]}
                            />
                        </Space>
                        <Space direction="vertical" className={styles["form-create-project__item"]}>
                            <label>Файлы задачи</label>
                            <Upload onChange={handleFileDocumetsChange}>
                                <Button icon={<UploadOutlined />}>Загрузить</Button>
                            </Upload>
                        </Space>
                        <Space className={styles["form-create-project__item"]}  direction="vertical">
                            <label>Описание задачи</label>
                            <TextArea onChange={handleDescriptionChange} className={styles["form-create-project__item-input"]}/>
                        </Space>
                    </form>
                    <div className={styles["modal-create-project__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={createTask} type="primary">Создать</Button>
                    </div>
                </ConfigProvider>

            </div>
        </>
    );
}
export default ModalCreateTask;

