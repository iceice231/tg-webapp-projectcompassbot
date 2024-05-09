import Logo from '../../assets/images/logoPCB.png'
import '../../assets/fonts/fonts.module.css'
import  styles from './RegistrationForm.module.scss'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Input } from 'antd';
import { useRef} from "react";
import React from "react";





function RegistrationForm() {
    const inputFullName = useRef("")
    const inputEmail = useRef("")
    const inputPassword = useRef("")
    const inputPasswordRepeat = useRef("")
    const inputKeyOrganization = useRef("")

    function registrationUser() {
        axios.post("http://localhost:3001/api/auth/register", {
            fullName: inputFullName.current.input.value,
            password: inputPassword.current.input.value,
            email: inputEmail.current.input.value,
            keyOrganization: inputKeyOrganization.current.input.value
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    return (
      <div className={styles["registration"]}>
        <div className={styles["registration__top"]}>
            <img src={Logo} alt="logo"/>
            <h1>Создание аккаунта</h1>
        </div>
          <form>
             <div className={styles["input__container"]}>
                 <label>ФИО</label>
                 <Input className={styles["form-input"]} placeholder="Иванов Иван Иванович" ref={inputFullName}/>
             </div>
              <div className={styles["input__container"]}>
                  <label>Электронная почта</label>
                  <Input className={styles["form-input"]} placeholder="example@gmail.com" ref={inputEmail}/>
              </div>
              <div className={styles["input__container"]}>
                  <label>Пароль</label>
                  <Input className={styles["form-input"]} placeholder="********" ref={inputPassword}/>
              </div>
              <div className={styles["input__container"]}>
                  <label>Повторите пароль</label>
                  <Input className={styles["form-input"]} placeholder="********" ref={inputPasswordRepeat}/>
              </div>
              <div className={styles["input__container"]}>
                  <label>Код организации</label>
                  <Input className={styles["form-input"]} placeholder="sfg21sfg3" ref={inputKeyOrganization}/>
              </div>
              <Link to='/login' onClick={registrationUser} className={styles["registration-btn"]}>Создать</Link>
              <div className={styles["registration__footer"]}>
                  <h5>Есть аккаунт?</h5>
                  <Link to="/login" className={styles["registration__footer-login"]}>Войти в аккаунт</Link>
              </div>
          </form>
      </div>
    );
}
  
export default RegistrationForm;