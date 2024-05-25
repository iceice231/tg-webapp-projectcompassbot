import styles from './ProjectList.module.css'
import '../../assets/fonts/fonts.module.css'

import ProjectItem from '../ProjectItem/ProjectItem.jsx';
import axios from "axios";

import { LuSettings2 } from "react-icons/lu";
import {useEffect, useState} from 'react';
import {Alert, ConfigProvider, Modal} from "antd";
import ModalCreateProject from "../ModalCreateProject/ModalCreateProject";
import ModalFilterProjects from "../ModalFilterProjects/ModalFilterProjects";
import {IoCloseCircleOutline} from "react-icons/io5";


function ProjectList() {

  const [data, setData] = useState([]);
  const [isClear, setIsClear] = useState(false)
  const [isModalCreateProjectOpen, setIsModalCreateProjectOpen] = useState(false);
  const [isModalFilterProjects, setIsModalFilterProjects] = useState(false);
  const [isPosition, setIsPosition] = useState(undefined)

  const [isErrorCreateProject, setIsErrorCreateProject] = useState(false)
  const [isErrorDeleteProject, setIsErrorDeleteProject] = useState(false)

  const apiUrl = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    axios.get(`${apiUrl}/api/project/all`,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          setData(response.data.projects)
          setIsPosition(response.data.namePosition)
        } )
  }, []);

  const showModalFilterProjects = () => {
      setIsModalFilterProjects(true);
  };
  const handleClearFilter = () => {
      setIsClear(false)
  }
  const handleOkFilterProjects = () => {
      setIsModalFilterProjects(false);
  };
  const handleCancelFilterProjects = () => {
      setIsModalFilterProjects(false);
  };

  const showModalCreateProject = () => {
      if(isPosition == "Рукводящая должность"){
          setIsModalCreateProjectOpen(true);
      } else {
          setIsErrorCreateProject(true)
          setTimeout(function () {
              setIsErrorCreateProject(false)
          }, 3000)
      }

  };
  const handleOkCreateProject = () => {
      setIsModalCreateProjectOpen(false);
  };
  const handleCancelCreateProject = () => {
      setIsModalCreateProjectOpen(false);
  };

    return (
        <>
            <div className={styles.projectList__wrapper}>
                {isErrorCreateProject ?
                    <Alert className={styles["alert-error"]} message="У вам нет прав, чтобы добавить проект" type="error" />
                : null}
                {isErrorDeleteProject ?
                    <Alert className={styles["alert-error"]} message="У вас не прав, чтобы удалить проект" type="error" />
                    : null}
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                fontFamily: 'NotoSansRegular',
                                colorPrimary: "#44d8ff"
                            }
                        }
                    }}>
                    <div className={styles.projestList__top}>
                        <h3 className={styles.title}>Проекты</h3>
                        <div className={styles.btnBox}>
                            <button onClick={showModalCreateProject} className={styles.btnAddProject}>Добавить</button>
                            <Modal
                                open={isModalCreateProjectOpen}
                                onOk={handleOkCreateProject}
                                onCancel={handleCancelCreateProject}
                                footer={(_, {OkBtn, CancelBtn}) => (
                                    <>
                                    </>)}>
                                <ModalCreateProject closeOkModal={handleOkCreateProject}
                                                    closeCancelModal={handleCancelCreateProject}></ModalCreateProject>
                            </Modal>

                            <div className={styles["group-btn-filter"]}>
                                {isClear ? <button onClick={handleClearFilter} className={styles["btn-clear"]}>Очистить<IoCloseCircleOutline/></button> : null}
                                <button onClick={showModalFilterProjects} className={styles.btnFilter}>
                                    <LuSettings2/>
                                </button>
                            </div>
                            <Modal
                                open={isModalFilterProjects}
                                onOk={handleOkFilterProjects}
                                onCancel={handleCancelFilterProjects}
                                footer={(_, {OkBtn, CancelBtn}) => (
                                    <>
                                    </>)}>
                                <ModalFilterProjects setClear={setIsClear} setData={setData} closeCancelModal={handleCancelFilterProjects}
                                                     closeOkModal={handleOkFilterProjects}></ModalFilterProjects>
                            </Modal>
                        </div>
                    </div>
                    <div className={styles.projectList__box}>
                        {data ? data.map((project) => (
                            <ProjectItem
                                key={project._id}
                                projectId={project._id}
                                nameProject={project.nameProject}
                                status = {project.status}
                                namePosition={isPosition}
                                errorDeleteProject={setIsErrorDeleteProject}
                            />)) : null}
                    </div>
                </ConfigProvider>
            </div>
        </>
    );
}
  
export default ProjectList;