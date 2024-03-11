import { Link } from 'react-router-dom'
import './AuthorizationForm.css'

import Logo from '../../assets/images/logoPCB.png'
import '../../assets/fonts/fonts.module.css'




function AuthorizationForm() {
    return (
      <>
      <div className="authorization">
        <img src={Logo} alt='logo'></img>
        <h2>Вход в аккаунт</h2>
        <form>
            <label>Логин</label>
            <input placeholder='Электронная почта или телефон'  type='text'></input>
            <label>Пароль</label>
            <input placeholder='Пароль'  type='text'></input>
            <label>Ключ организации</label>
            <input placeholder='Ключ'  type='text'></input>
            <button className='btn-submit' type='submit'>Войти</button>
        </form>
        <div className="authorization_footer">
          <h5>Нет аккаунта?</h5>
          <Link to='/registration'>Зарегистрироваться</Link>
        </div>
      </div>
      </>
    );
}
  
export default AuthorizationForm;