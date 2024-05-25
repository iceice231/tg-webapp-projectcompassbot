import styles from './ModalFilterReport.module.scss'
import {Button, ConfigProvider, DatePicker, Input, Select, Space, Upload} from "antd";
import axios from "axios";
import React, {useState} from "react";;


function ModalFilterReport(props) {

    const [isDateCompilation, setIsDateCompilation] = useState(undefined)
    const [isNameReport, setIsNameReport] = useState(undefined);
    const [isType, setIsType] = useState(undefined);
    const [isResponsible, setIsResponsible] = useState(undefined)

    const { setDataReports, closeCancelModal, closeOkModal, setClear} = props


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


    const getReports = () => {

        const bodyRequest = {
            nameReport: isNameReport,
            dateCompilation: isDateCompilation,
            typeReport: isType,
            employee: isResponsible
        }

        axios.post(`http://localhost:3001/api/report/find`, bodyRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then( ( response ) => {
                (setDataReports(response.data.reports))
            } )

        if(!setDataReports.empty){
            closeOkModal()
            setClear(true)
        }
    }

    return (
        <>
            <div className={styles['modal-filter-projects__wrapper']}>
                <ConfigProvider
                    theme={{
                        components: {
                            DatePicker: {
                                colorPrimary: '#44d8ff',
                                algorithm: true,
                                fontFamily: 'NotoSansRegular',
                            },
                            Input: {
                                colorPrimary: '#44d8ff',
                            },
                            Select: {
                                colorPrimary: '#44d8ff',
                                fontFamily: 'NotoSansRegular',
                            }
                        }
                    }}>
                    <h3 className={styles['modal-filter-projects__title']}>Найти задачу</h3>
                    <form>
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
                    </form>
                    <div className={styles["modal-filter-projects__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={getReports} type="primary">Применить</Button>
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}

export default ModalFilterReport;