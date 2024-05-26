import { useState } from 'react';
import styles from './Header.module.css'
import '../../assets/fonts/fonts.module.css'


import { BiMenu } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import LogoPCB from '../../assets/images/logoPCB.png'
import { Link } from 'react-router-dom';
import {TbReportAnalytics} from "react-icons/tb";

function Header() {
    const [isActive, setActive] = useState(false);

    const userId = localStorage.getItem("token")

    return (
      <>
        <header className={!isActive ? styles.headerClose : styles.headerOpen}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__top}>
                    <button onClick={() => setActive(!isActive)} className={styles.btn__menu}>{!isActive ? <BiMenu /> : <IoMdClose />}</button>
                    <img src={LogoPCB} alt="" />
                    <h5 className={styles.logo__text}>ProjectCompass</h5>
                </div>
                <nav className={styles.navOpen}>
                    <div className={styles.sections}>
                        <h5 className={styles.subtitle}>Организация</h5>
                        <Link className={styles.nav__link} to='/projects'><FaProjectDiagram className={styles.navIcon}/>Проекты</Link>
                        <Link className={styles.nav__link} to='/reports'><TbReportAnalytics className={styles.navIcon}/>Отчеты</Link>
                        <Link className={styles.nav__link} to='/staff'><BsFillPeopleFill className={styles.navIcon}/>Сотрудники</Link>
                    </div>
                    <div className={styles.sections}>
                        <h5 className={styles.subtitle}>Пользователь</h5>
                        <Link className={styles.nav__link} to={`/profile`}><FaUserCircle className={styles.navIcon}/>Профиль</Link>
                        <Link className={styles.nav__link} to="/notification"><IoNotifications className={styles.navIcon}/>Уведомления</Link>
                    </div>
                </nav>
            </div>
        </header>
      </>
    );
}
  
export default Header;