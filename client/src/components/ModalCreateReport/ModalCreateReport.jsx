import React, {useRef, useState} from "react";
import styles from './ModalCreateReport.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, DatePicker, Input, InputNumber, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";


function ModalCreateReport(props) {
    const [isDateCompilation, setIsDateCompilation] = useState(null)
    const [isNameReport, setIsNameReport] = useState(null);
    const [isType, setIsType] = useState("");
    const [isFile, setIsFile] = useState(null)
    const [isResponsible, setIsResponsible] = useState(undefined)

    const fd = new FormData()

    const apiUrl = process.env.REACT_APP_BASE_URL

    const {closeOkModal, closeCancelModal} = props

    const handleDateCompilationChange = (date, dateString) => {
        setIsDateCompilation(dateString)
    };


    const handleNameReportChange = (event) => {
        setIsNameReport(event.target.value)
    }

    const handleResponsibleChange = (event) => {
        setIsResponsible(event.target.value)
    }

    const handleTypeChange = (event) => {
        setIsType(event)
    }

    const handleFileChange = (file) => {
        setIsFile(file.file.originFileObj);
    }

    function createReport() {
        const bodyRequest = {
            nameReport: isNameReport,
            dateCompilation: isDateCompilation,
            typeReport: isType,
            employee: isResponsible,
        }

        fd.append('isFile', isFile);
        Object.entries(bodyRequest).forEach(([k, v]) => fd.append(k, v))
        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }

        axios.post(`${apiUrl}/api/report/create`, fd, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function (response) {
                fd.delete("nameReport")
                fd.delete("dateCompilation")
                fd.delete("typeReport")
                fd.delete("employee")
                fd.delete("isFile")
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
                    <h3 className={styles["modal-create-project__title"]}>Добавление отчета</h3>
                    <form className={styles["form-create-project"]}>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Название отчета</label>
                            <Input onChange={handleNameReportChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Дата составления</label>
                            <DatePicker onChange={handleDateCompilationChange} className={styles["form-create-project__item-input"]} placeholder={['Установите дату']}/>
                        </Space>
                        <Space className={styles["form-create-project__item"]} direction="vertical">
                            <label>Составитель</label>
                            <Input onChange={handleResponsibleChange} className={styles["form-create-project__item-input"]}></Input>
                        </Space>
                        <Space className={styles["form-create-project__item"]}>
                            <label>Тип отчета</label>
                            <Select
                                onChange={(event) => handleTypeChange(event)}
                                className={styles["form-create-project__item-select]"]}
                                style={{width: 170}}
                                options={[
                                    {
                                        value: 'О состоянии',
                                        label: 'О состоянии'
                                    },
                                    {
                                        value: 'Об отклонении',
                                        label: 'Об отклонении'
                                    },
                                    {
                                        value: 'Базовый',
                                        label: 'Базовый'
                                    }
                                ]}
                            />
                        </Space>
                        <Space direction="vertical" className={styles["form-create-project__item"]}>
                            <label>Файлы отчета</label>
                            <Upload onChange={handleFileChange}>
                                <Button icon={<UploadOutlined />}>Загрузить</Button>
                            </Upload>
                        </Space>
                    </form>
                    <div className={styles["modal-create-project__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={createReport} type="primary">Создать</Button>
                    </div>
                </ConfigProvider>

            </div>
        </>
    );
}
export default ModalCreateReport;

