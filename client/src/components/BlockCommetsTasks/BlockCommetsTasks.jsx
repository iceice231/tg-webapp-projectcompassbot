import styles from './BlockCommetsTasks.module.scss'
import '../../assets/fonts/fonts.module.css'

import React, {useEffect, useState} from 'react';

import axios, {post} from "axios";

import TextArea from "antd/es/input/TextArea";
import {Button, Upload} from "antd";
import CommentItem from "../CommentItem/CommentItem";
import {UploadOutlined} from "@ant-design/icons";




function BlockCommentsTasks(props) {


    const {taskId, dataComments} = props
    const formDataComment = new FormData()
    const [isTextComment, setIsTextComment] = useState("")
    const [isFile, setIsFile] = useState(undefined)



    const createComment = () => {
        formDataComment.append('isFile', isFile);
        formDataComment.append('textComment', isTextComment);
        formDataComment.append('taskId', taskId)
        axios.post(`http://localhost:3001/api/project/task/${taskId}/comment/create`, formDataComment, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                formDataComment.delete("isFile")
                formDataComment.delete("textComment")
                formDataComment.delete("taskId")
                console.log(response.data)
            })
    }

    const handleTextChange = (event) => {
        setIsTextComment(event.target.value)
    }
    const handleFileChange = (file) => {
        setIsFile(file.file.originFileObj);
    }


    return (
        <>
            <div className={styles["block-comments"]}>
                <div className={styles["block-comments__wrapper"]}>
                    <h3 className={styles["block-comments__title"]}>Напишите комментарий к задаче</h3>
                    <form className={styles["block-comments__form"]}>
                        <TextArea onChange={handleTextChange} placeholder="Текст комментария..."></TextArea>
                        <Upload onChange={handleFileChange}>
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                    </form>
                    <Button onClick={createComment} type="primary">Отправить</Button>
                    <hr className={styles["line-separator"]}/>
                    {dataComments ? dataComments.map(commentItem => <CommentItem dataComment={commentItem}/>)
                        : <p>Комментарии остутствуют</p>
                    }
                </div>
            </div>
        </>
    );
}

export default BlockCommentsTasks;