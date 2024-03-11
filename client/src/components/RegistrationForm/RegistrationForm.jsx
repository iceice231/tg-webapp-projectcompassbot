import './RegistrationForm.css'
import Logo from '../../assets/images/logoPCB.png'
import '../../assets/fonts/fonts.module.css'

import { Link } from 'react-router-dom'


function RegistrationForm() {
    return (
      <div className="registration">
        <img src={Logo} alt='logo'></img>
        <h2>Создание аккаунта</h2>
        <form>
            <label>ФИО</label>
            <input type="text" placeholder='Фамилия имя отчество'/>
            <label>Логин</label>
            <input placeholder='Электронная почта или телефон' type='text'></input>
            <label>Пароль</label>
            <input placeholder='Пароль'  type='text'></input>
            <label>Ключ организации</label>
            <input placeholder='Ключ'  type='text'></input>
            <button className='btn-submit' type='submit'>Зарегистрироваться</button>
        </form>
        <div className="registration_footer">
          <h5>Уже есть аккаунт?</h5>
          <Link to="/">Авторизоваться</Link>
          <Link to="/projects">sdsdasdasdasdas</Link>
        </div>
      </div>
    );
}
  
export default RegistrationForm;