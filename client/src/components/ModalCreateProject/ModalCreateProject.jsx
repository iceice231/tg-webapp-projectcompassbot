import React, {useRef, useState} from "react";
import styles from './ModalCreateProject.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, DatePicker, Input, InputNumber, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";


function ModalCreateProject(props) {
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [isDateEnd, setIsDateEnd] = useState(null)
    const [isNameProject, setIsNameProject] = useState(null);
    const statusSelect = useRef()
    const [isBudget, setIsBudget] = useState(null);
    const [isStatus, setIsStatus] = useState("");
    const [isDescription, setIsDescription ] = useState(null)
    const [isFile, setIsFile] = useState(null)
    const [isResponsible, setIsResponsible] = useState(undefined)

    const fd = new FormData()

    const {closeOkModal, closeCancelModal} = props

    const handleDateStartChange = (date, dateString) => {
        setSelectedDateStart(dateString)
    };

    const handleDateEndChange = (date, dateString) => {
        setIsDateEnd(dateString)
    }

    const handleNameProjectChange = (event) => {
        setIsNameProject(event.target.value)
    }

    const handleResponsibleChange = (event) => {
        setIsResponsible(event.target.value)
    }

    const handleBudgetChange = (value) => {
        setIsBudget(value)
    }

    const handleStatusChange = (event) => {
       setIsStatus(event)
    }

    const handleDescriptionChange = (event) => {
        setIsDescription(event.target.value)
    }

    const handleFileChange = (file) => {
        setIsFile(file.file.originFileObj);
    }

    function createProject() {
        const bodyRequest = {
            nameProject: isNameProject,
            dateStart: selectedDateStart,
            dateEnd: isDateEnd,
            budget: isBudget,
            status: isStatus,
            description: isDescription,
            responsible: isResponsible
        }

        fd.append('isFile', isFile);
        Object.entries(bodyRequest).forEach(([k, v]) => fd.append(k, v))
        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }

        axios.post("http://localhost:3001/api/project/create", fd, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function (response) {
                fd.delete("nameProject")
                fd.delete("dateStart")
                fd.delete("dateEnd")
                fd.delete("budget")
                fd.delete("status")
                fd.delete("description")
                fd.delete("responsible")
                console.log(response)
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
                            },
                            Button: {
                                fontFamily: 'NotoSansRegular',
                                colorPrimary: "#44d8ff"
                            }
                        }
                    }}>
                    <h3 className={styles["modal-create-project__title"]}>Создание проекта</h3>
                    <form className={styles["form-create-project"]}>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Название проекта</label>
                            <Input onChange={handleNameProjectChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата начала</label>
                            <DatePicker onChange={handleDateStartChange} className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата конца</label>
                            <DatePicker onChange={handleDateEndChange}  colorBorder="#fff" className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Ответственный</label>
                            <Input onChange={handleResponsibleChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Бюджет</label>
                            <InputNumber onChange={handleBudgetChange} className={styles["form-create-project__item-input"]} addonAfter="₽"/>
                        </Space>
                        <Space className={styles["form-create-project__item"]}>
                            <label>Статус</label>
                            <Select
                                ref={statusSelect}
                                onChange={(event) => handleStatusChange(event)}
                                className={styles["form-create-project__item-select]"]}
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
                        <Space direction="vertical" className={styles["form-create-project__item"]}>
                            <label>Файлы проекта</label>
                            <Upload onChange={handleFileChange}>
                                <Button icon={<UploadOutlined />}>Загрузить</Button>
                            </Upload>
                        </Space>
                        <Space className={styles["form-create-project__item"]}  direction="vertical">
                            <label>Описание проекта</label>
                            <TextArea onChange={handleDescriptionChange} className={styles["form-create-project__item-input"]}/>
                        </Space>
                    </form>
                    <div className={styles["modal-create-project__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={createProject} type="primary">Создать</Button>
                    </div>
                </ConfigProvider>

            </div>
        </>
    );
}
export default ModalCreateProject;

