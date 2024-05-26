import styles from './BlockTechnicalFiles.module.scss'
import '../../assets/fonts/fonts.module.css'

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, ConfigProvider, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

function BlockTechnicalFiles(props) {

    const {filesTechnical, projectId, taskId} = props

    const [isFile, setIsFile] = useState(undefined)

    const formDataFiles = new FormData()

    const apiUrl = process.env.REACT_APP_BASE_URL
    const handleFileChange = (file) => {
        setIsFile(file.file.originFileObj);
    }

    const postFilesTechnical = () => {
        formDataFiles.append('isFile', isFile);
        for (let [key, value] of formDataFiles.entries()) {
            console.log(key, value);
        }

        axios.post(`${apiUrl}/api/project/${projectId}/task/${taskId}/file/upload`, formDataFiles, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
            })
    }

    return (
        <>
            <div className={styles["block-technical-files"]}>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                fontFamily: 'NotoSansRegular',
                                colorPrimary: "#44d8ff"
                            },
                            Upload: {
                                colorPrimary: '#44d8ff',
                                actionsColor: '#44d8ff',
                            },
                        }
                    }}>
                <div className={styles["block-technical-files__wrapper"]}>
                    <h3 className={styles["block-technical-files__title"]}>Технические файлы</h3>
                    <div className={styles["block-technical-files__files"]}>
                        { filesTechnical ? filesTechnical.map((file) => (
                            <a href={`http://localhost:3001/${file.urlPath}`}>{file.nameFile}</a>
                        )) : null }
                    </div>
                    <Space>
                        <Upload onChange={handleFileChange}>
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                        <Button onClick={postFilesTechnical} type="primary">Отправить</Button>
                    </Space>

                </div>
                    </ConfigProvider>
            </div>
        </>
    );
}

export default BlockTechnicalFiles;