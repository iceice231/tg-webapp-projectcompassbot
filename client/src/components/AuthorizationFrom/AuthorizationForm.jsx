import {Link, useNavigate} from 'react-router-dom'
import styles from  './AuthorizationForm.module.scss'

import Logo from '../../assets/images/logoPCB.png'
import '../../assets/fonts/fonts.module.css'

import { Input } from 'antd';
import axios from "axios";
import {useRef} from "react";



function AuthorizationForm(props) {
    const navigate = useNavigate()
    const inputEmail = useRef("")
    const inputPassword = useRef("")
    const inputKeyOrganization = useRef("")

    const apiUrl = process.env.REACT_APP_BASE_URL

    function loginUser() {
        console.log(apiUrl)
        axios.post(`${apiUrl}/api/auth/login`, {
            password: inputPassword.current.input.value,
            email: inputEmail.current.input.value,
        }, {
            method: "post",
            withCredentials: false
        })
            .then(function (response) {
                localStorage.setItem('token', response.data.token)

                if(localStorage.getItem('token')) {
                    navigate('/projects')
                 }
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return (
      <>
      <div className={styles["login"]}>
          <div className={styles["login__top"]}>
              <img src={Logo} alt='logo'></img>
              <h1>Войти в аккаунт</h1>
          </div>
        <form>
            <div className={styles["input__container"]}>
                <label className={styles["form-label"]}>Email</label>
                <Input
                    type="email"
                    className={styles["form-input"]}
                    placeholder="example@gmail.com"
                    ref={inputEmail}/>
            </div>
            <div className={styles["input__container"]}>
                <label className={styles["form-label"]}>Пароль</label>
                <Input
                    type="password"
                    className={styles["form-input"]}
                    placeholder="********"
                    ref={inputPassword}/>
            </div>
            <Link onClick={loginUser} className={styles["login-button"]}  type="primary">Войти</Link>
            <div className={styles["login__footer"]}>
                <h5 className={styles["login__footer-title"]}>Нет аккаунта?</h5>
                <Link className={styles["login__footer-sign"]}  to='/registration'>Зарегистрироваться</Link>
            </div>
        </form>
      </div>
      </>
    );
}
  
export default AuthorizationForm;