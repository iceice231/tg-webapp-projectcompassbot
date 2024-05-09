import styles from './ModalFilterProjects.module.scss'
import {Button, ConfigProvider, Input, Select, Space} from "antd";
import axios from "axios";
import {useState} from "react";


function ModalFilterProjects(props) {
    const [dataProject, setDataProject] = useState(null)
    const [isNameProject, setIsNameProject] = useState(null)
    const [isStatus, setIsStatus] = useState(null)

    const {setData, closeCancelModal, closeOkModal, setClear} = props

    const handleNameProjectChange = (event) => {
        setIsNameProject(event.target.value)
    }

    const handleStatusChange = (value) => {
        setIsStatus(value)
    }

    const getProjects = () => {

        const bodyRequest = {
            nameProject: isNameProject,
            status: isStatus
        }

        axios.post("http://localhost:3001/api/project/find", bodyRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then( ( response ) => {
                (setDataProject(response.data.projects))
            } )

        console.log(dataProject)
        setData(dataProject)
        if(!setData.empty){
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
                <h3 className={styles['modal-filter-projects__title']}>Найти проект</h3>
                <form>
                    <Space className={styles['form-filter-projects__item']} direction="vertical">
                        <label>Название проекта</label>
                        <Input onChange={handleNameProjectChange} className={styles["form-filter-projects__item-input"]}></Input>
                    </Space>
                    <Space className={styles['form-filter-projects__item']} direction="vertical">
                        <label>Статус проекта</label>
                        <Select
                            onChange={handleStatusChange}
                            className={styles["form-filter-projects__item-select]"]}
                            defaultValue="В разработке"
                            style={{width: 170}}
                            options={[
                                {
                                    value: 'в разработке',
                                    label: 'В разработке'
                                },
                                {
                                    value: 'приостановлен',
                                    label: 'Приостановлен'
                                },
                                {
                                    value: 'завершен',
                                    label: 'Завершен'
                                }
                            ]}>

                        </Select>
                    </Space>
                </form>
                    <div className={styles["modal-filter-projects__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={getProjects} type="primary">Применить</Button>
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}

export default ModalFilterProjects;