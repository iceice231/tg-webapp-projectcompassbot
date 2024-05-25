import Logo from '../../assets/images/logoPCB.png'
import '../../assets/fonts/fonts.module.css'
import  styles from './RegistrationForm.module.scss'
import axios from "axios";
import { Link } from 'react-router-dom'
import {ConfigProvider, Input, Select, Space} from 'antd';
import {useRef, useState} from "react";
import React from "react";





function RegistrationForm() {
    const inputFullName = useRef("")
    const inputEmail = useRef("")
    const inputPassword = useRef("")
    const inputPasswordRepeat = useRef("")
    const inputKeyOrganization = useRef("")

    const [isPosition, setIsPosition] = useState(undefined)
    const [isKeyDirector, setIsKeyDirector] = useState(undefined)

    function registrationUser() {
        axios.post("http://localhost:3001/api/auth/register", {
            fullName: inputFullName.current.input.value,
            password: inputPassword.current.input.value,
            email: inputEmail.current.input.value,
            keyOrganization: inputKeyOrganization.current.input.value,
            keyDirector: isKeyDirector,
            position: isPosition
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    const handlePositionChange = (event) => {
        setIsPosition(event)
    }

    const handleKeyDirectorChange = (event) => {
        setIsKeyDirector(event.target.value)
        console.log(isKeyDirector)
    }

    return (
      <div className={styles["registration"]}>
          <ConfigProvider
              theme={{
                  components: {
                      Select: {
                          colorPrimary: '#44d8ff',
                          fontFamily: 'NotoSansRegular',
                      },
                  }
              }}>
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
              <Space direction="vertical" className={styles["input__container"]}>
                  <label>Должность</label>
                  <Select
                      defaultValue='Испоняющая должность'
                      onChange={(event) => handlePositionChange(event)}
                      className={styles["form-create-project__item-select]"]}
                      style={{width: 230}}
                      options={[
                          {
                              value: 'Руководящая должность',
                              label: 'Руководящая должность'
                          },
                          {
                              value: 'Исполняющая должность',
                              label: 'Исполняющая должность'
                          },
                      ]}
                  />
              </Space>
              {isPosition == "Руководящая должность" ?  <div className={styles["input__container"]}>
                  <label>Код доступа должности</label>
                  <Input onChange={handleKeyDirectorChange} className={styles["form-input"]} placeholder="sfg21sfg3" ref={inputKeyOrganization}/>
              </div>: null}
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
          </ConfigProvider>
      </div>

    );
}
  
export default RegistrationForm;