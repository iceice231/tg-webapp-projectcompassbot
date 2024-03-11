import styles from './ProjectList.module.css'
import '../../assets/fonts/fonts.module.css'

import ProjectItem from '../ProjectItem/ProjectItem.jsx';
import axios from "axios";

import { LuSettings2 } from "react-icons/lu";
import FilterProjectWindow from '../FilterProjectWindow/FilterProjectWindow.jsx';
import {useEffect, useState} from 'react';

const Projects = [{id:1, title: "Backend"}, {id:2, title: "Frontend"}]


function ProjectList() {

  const [isOpen, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2JhOGJmZDFmM2M4ZDliMjUwNzM4MCIsImlhdCI6MTcwNzg0NjgzMCwiZXhwIjoxNzEwNDM4ODMwfQ.H_zB4lGaNUHMlqK6zv8IiMII9VBszh0GJnrWZMm_42k"

  useEffect(() => {
    axios.get("http://localhost:3001/api/project/all",
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then( ( response ) => {
          (setData(response.data.projects))
    } )
  }, []);

    return (
      <>
        <div className={styles.projectList__wrapper}>
          <FilterProjectWindow isOpen={isOpen} setOpen={setOpen}/>
            <div className={styles.projestList__top}>
              <h3 className={styles.title}>Проекты</h3>
              <div className={styles.btnBox}>
                <button className={styles.btnAddProject}>Добавить</button>
                <button onClick={() => {setOpen(!isOpen)}} className={styles.btnFilter}>
                  <LuSettings2 />
                </button>
              </div>
            </div>
            <div className={styles.projectList__box}>
              {data.map((project) => (
                <ProjectItem key={project._id} nameProject={project.nameProject}/>))}
            </div>
        </div>
      </>
    );
}
  
export default ProjectList;