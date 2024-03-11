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

function Header() {
    const [isActive, setActive] = useState(false);


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
                        <Link className={styles.nav__link} to='/'><FaProjectDiagram className={styles.navIcon}/>Проекты</Link>
                        <Link className={styles.nav__link} to='/'><BsFillPeopleFill className={styles.navIcon}/>Сотрудники</Link>
                    </div>
                    <div className={styles.sections}>
                        <h5 className={styles.subtitle}>Пользователь</h5>
                        <Link className={styles.nav__link} to="/"><FaUserCircle className={styles.navIcon}/>Профиль</Link>
                        <Link className={styles.nav__link} to="/"><IoNotifications className={styles.navIcon}/>Уведомления</Link>
                    </div>
                </nav>
            </div>
        </header>
      </>
    );
}
  
export default Header;