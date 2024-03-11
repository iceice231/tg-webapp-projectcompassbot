import styles from './FilterProjectWindow.module.css'
import '../../assets/fonts/fonts.module.css'

import { IoMdClose } from "react-icons/io";

function FilterProjectWindow(props) {
    
    const {isOpen, setOpen} = props

    return (
      <>
      <div className={!isOpen ? styles.filterWindowClose__bg : styles.filterWindowOpen__bg}>
        <div className={styles.filter}>
            <div className={styles.filter__wrapper}>
                <h3 className={styles.filterTitle}>Поиск проектов</h3>
                <form className={styles.filterForm} action="">
                    <label className={styles.filterLabel} htmlFor="">Название проекта</label>
                    <input placeholder='Наименование проекта' type="text" className={styles.filterInput}/>
                    <div className={styles.filterRadio}>
                        <label className={styles.filterLabel} htmlFor="">Статус проекта</label>
                        <div className={styles.radioBox}>

                            <input id="completed" type="radio" name="completed"/>
                            <label className={styles.filterLabel} htmlFor="completed">Завершен</label>
                        </div>
                        <div className={styles.radioBox}>
                            <input id="development" type="radio" name="development"/>
                            <label className={styles.filterLabel} htmlFor="development">В разработке</label>
                        </div>
                    </div>
                    <div className={styles.filterFooter}>
                        <button className={styles.btnFilter}>Применить</button>
                        <button className={styles.btnFilter}>Очистить</button>
                    </div>
                    
                </form>
            </div>
            <button onClick={() => {setOpen(!isOpen)}} className={styles.btnCloseFilter}><IoMdClose /></button>
        </div>
      </div>
      </>
    );
}
  
export default FilterProjectWindow;