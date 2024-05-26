import React, {useEffect, useRef, useState} from "react";
import styles from './ModalChangeProject.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, DatePicker, Input, InputNumber, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from 'dayjs';


function ModalChangeProject(props) {
    const [isDateStart, setIsDateStart] = useState(undefined);
    const [isDateEnd, setIsDateEnd] = useState(undefined)
    const [isNameProject, setIsNameProject] = useState(undefined);
    const [isBudget, setIsBudget] = useState(undefined);
    const [isStatus, setIsStatus] = useState(undefined);
    const [isDescription, setIsDescription ] = useState(undefined)
    const [isFile, setIsFile] = useState(undefined)
    const [isResponsible, setIsResponsible] = useState(undefined)

    const apiUrl = process.env.REACT_APP_BASE_URL

    const fdUpdate = new FormData()

    const {closeOkModal, closeCancelModal, projectData, projectFiles, setUpdateData} = props

    const handleDateStartChange = (date, dateString) => {
        setIsDateStart(dateString)
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

    function updateProject() {
        const bodyRequest = {
            nameProject: isNameProject,
            dateStart: isDateStart,
            dateEnd: isDateEnd,
            budget: isBudget,
            status: isStatus,
            description: isDescription,
            responsible: isResponsible
        }

        fdUpdate.append('isFile', isFile);
        Object.entries(bodyRequest).forEach(([k, v]) => fdUpdate.append(k, v))
        for (let [key, value] of fdUpdate.entries()) {
            console.log(key, value);
        }

        axios.post(`${apiUrl}/api/project/update/${projectData._id}`, fdUpdate, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
            .then(function (response) {
                fdUpdate.delete("nameProject")
                fdUpdate.delete("dateStart")
                fdUpdate.delete("dateEnd")
                fdUpdate.delete("budget")
                fdUpdate.delete("status")
                fdUpdate.delete("description")
                fdUpdate.delete("isFile")
                fdUpdate.delete("responsible")
                setUpdateData(true)
                setTimeout(function (){
                    setUpdateData(false)
                }, 1000)
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
                            }
                        }
                    }}>
                    <h3 className={styles["modal-create-project__title"]}>Изменение проекта</h3>
                    <form className={styles["form-create-project"]}>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Название проекта</label>
                            <Input placeholder={projectData.nameProject} onChange={handleNameProjectChange} className={styles["form-create-project__item-input"]}></Input>
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
                            <label>Руководитель</label>
                            <Input onChange={handleResponsibleChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Бюджет</label>
                            <InputNumber onChange={handleBudgetChange} className={styles["form-create-project__item-input"]} addonAfter="₽"/>
                        </Space>
                        <Space className={styles["form-create-project__item"]}>
                            <label>Статус</label>
                            <Select
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
                            <Upload  onChange={handleFileChange}>
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
                        <Button onClick={updateProject} type="primary">Сохранить</Button>
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}
export default ModalChangeProject;

