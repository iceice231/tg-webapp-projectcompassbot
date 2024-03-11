import { useEffect } from 'react';
import './App.css';
import AuthorizationForm from './components/AuthorizationFrom/AuthorizationForm.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
import MainPage from './pages/mainPage/mainPage.jsx'
import { Routes, Route} from 'react-router-dom';

const tg = window.Telegram.WebApp;



function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthorizationForm/>}/>
        <Route path="/registration" element={<RegistrationForm/>}/>
        <Route path="/projects" element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
