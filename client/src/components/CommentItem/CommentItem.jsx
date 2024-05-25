import styles from './CommentItem.module.scss'
import '../../assets/fonts/fonts.module.css'

import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import React, {useEffect, useState} from "react";




function CommentItem(props) {

    const {dataComment} = props
    const [isDateCreateComment, setIsDateCreateComment] = useState("")

    useEffect(() => {
        let dateCreateComment = new Date(dataComment.comment.createdAt)
        if (dateCreateComment) {
            let year = dateCreateComment.getFullYear()
            let month = dateCreateComment.getMonth()
            let day = dateCreateComment.getDay()
            setIsDateCreateComment(((day < 10 ? "0": "") + day + "." + (month < 10 ? "0": "") + month + "." + year).toString())
        }
    },[])

    return (
        <>
            <div className={styles["comment-item"]}>
                <div className={styles["comment-item__wrapper"]}>
                    <div className={styles["comment-info"]}>
                        <a className={styles["comment-info__name-user"]} href="#">{dataComment.comment.userName}</a>
                        <p className={styles["comment-info__date"]}>{isDateCreateComment}</p>
                    </div>
                    <div className={styles["comment-body"]}>
                        <p className={styles["comment-body__text"]}>{dataComment.comment.textComment}</p>
                        {dataComment.files ? dataComment.files.map(fileItem =>
                            <a className={styles["comment-body__file"]} href={`http://localhost:3001/${fileItem.urlPath}`}>{fileItem.nameFile}</a>)
                            : null
                        }

                    </div>

                </div>
            </div>
        </>
    );
}

export default CommentItem;