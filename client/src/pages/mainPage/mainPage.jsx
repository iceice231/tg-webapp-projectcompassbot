import styles from './mainPage.module.css'
import '../../assets/fonts/fonts.module.css'

import Header from '../../components/Header/Header.jsx'
import ProjectList from '../../components/ProjectList/ProjectList.jsx';
import ProjectPage from "../ProjectPage/ProjectPage";

function mainPage() {
    
    return (
      <>
        <Header/>
        <div className={styles.mainPage__wrapper}>
          <ProjectList/>
        </div>
      </>
    );
}
  
export default mainPage;