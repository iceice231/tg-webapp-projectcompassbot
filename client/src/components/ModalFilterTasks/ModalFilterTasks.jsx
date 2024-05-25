import styles from './ModalFilterTasks.module.scss'
import {Button, ConfigProvider, Input, Select, Space} from "antd";
import axios from "axios";
import {useState} from "react";


function ModalFilterProjects(props) {

    const [isNameTask, setIsNameTask] = useState(undefined)
    const [isStatus, setIsStatus] = useState(undefined)
    const [isPriority, setIsPriority] = useState(undefined)

    const {setData, closeCancelModal, closeOkModal, setClear, idProject} = props

    const handleNameTaskChange = (event) => {
        setIsNameTask(event.target.value)
    }

    const handleStatusChange = (value) => {
        setIsStatus(value)
    }
    const handlePriorityChange = (value) => {
        setIsPriority(value)
    }

    const getTasks = () => {

        const bodyRequest = {
            nameTask: isNameTask,
            status: isStatus,
            priority: isPriority
        }

        axios.post(`http://localhost:3001/api/project/${idProject}/task/find`, bodyRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then( ( response ) => {
                (setData(response.data.tasks))
            } )

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
                    <h3 className={styles['modal-filter-projects__title']}>Найти задачу</h3>
                    <form>
                        <Space className={styles['form-filter-projects__item']} direction="vertical">
                            <label>Название задачи</label>
                            <Input onChange={handleNameTaskChange} className={styles["form-filter-projects__item-input"]}></Input>
                        </Space>
                        <Space className={styles['form-filter-projects__item']} direction="vertical">
                            <label>Статус задачи</label>
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
                        <Space className={styles['form-filter-projects__item']} direction="vertical">
                            <label>Приоритет задачи</label>
                            <Select
                                onChange={handlePriorityChange}
                                className={styles["form-filter-projects__item-select]"]}
                                defaultValue="В разработке"
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
                                ]}>

                            </Select>
                        </Space>
                    </form>
                    <div className={styles["modal-filter-projects__wrapper-footer"]}>
                        <Button onClick={closeCancelModal}>Отмена</Button>
                        <Button onClick={getTasks} type="primary">Применить</Button>
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}

export default ModalFilterProjects;