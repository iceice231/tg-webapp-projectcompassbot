import styles from './PageReports.module.scss'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import {Button, ConfigProvider, Modal} from "antd";
import ReportItem from "../../components/ReportItem/ReportItem";
import {useEffect, useState} from "react";
import ModalCreateReport from "../../components/ModalCreateReport/ModalCreateReport";
import axios from "axios";
import {LuSettings2} from "react-icons/lu";
import ModalFilterReport from "../../components/ModalFilterReport/ModalFilterReport";
import {IoCloseCircleOutline} from "react-icons/io5";

function PageReports() {
    const [isModalCreateReport, setIsModalCreateReport] = useState(false)
    const [isModalFilterReport, setIsModalFilterReport] = useState(false)
    const [isClear, setIsClear] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDataReports, setIsDataReports] = useState([])

    const apiUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(`${apiUrl}/api/report/all`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                setIsDataReports(response.data.reports)
            } )
    }, [isClear, isUpdate])

    const showModalCreateReport = () => {
        setIsModalCreateReport(true)
    };
    const handleOkCreateReport = () => {
        setIsModalCreateReport(false);
    };
    const handleCancelCreateReport = () => {
        setIsModalCreateReport(false);
    };

    const showModalFilterReport = () => {
        setIsModalFilterReport(true)
    };
    const handleOkFilterReport = () => {
        setIsModalFilterReport(false);
    };
    const handleCancelFilterReport = () => {
        setIsModalFilterReport(false);
    };

    const handleClearFilter = () => {
        setIsClear(false);
    };

    return (
        <>
            <Header/>
            <div className={styles["page-reports__wrapper"]}>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                fontFamily: 'NotoSansRegular',
                                colorPrimary: "#44d8ff"
                            }
                        }
                    }}>
                <h3 className={styles["page-reports__title"]}>Отчеты</h3>
                <div className={styles["page-reports__top"]}>
                        <Button onClick={showModalCreateReport} type="primary">Добавить</Button>
                    <div className={styles["pageReports__group-btn-filter"]}>
                        {isClear ? <button onClick={handleClearFilter} className={styles["btn-clear"]}>Очистить<IoCloseCircleOutline/></button> : null}
                        <button onClick={showModalFilterReport} className={styles.btnFilter}>
                            <LuSettings2/>
                        </button>
                    </div>
                    <Modal
                        open={isModalCreateReport}
                        onOk={handleOkCreateReport}
                        onCancel={handleCancelCreateReport}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalCreateReport closeCancelModal={handleCancelCreateReport}
                                             closeOkModal={handleOkCreateReport}></ModalCreateReport>
                    </Modal>
                    <Modal
                        open={isModalFilterReport}
                        onOk={handleOkFilterReport}
                        onCancel={handleCancelFilterReport}
                        footer={(_, {OkBtn, CancelBtn}) => (
                            <>
                            </>)}>
                        <ModalFilterReport
                            closeCancelModal={handleCancelFilterReport}
                            closeOkModal={handleOkFilterReport}
                            setDataReports={setIsDataReports}
                            setClear={setIsClear}
                            >
                        </ModalFilterReport>
                    </Modal>
                </div>
                {
                    isDataReports ? isDataReports.map((reportItem) => (
                        <ReportItem setUpdate={setIsUpdate} dataReports={reportItem}/>
                    )) : null
                }
                </ConfigProvider>
            </div>
        </>
    );
}

export default PageReports;