import { useEffect } from 'react';
import './App.css';
import AuthorizationForm from './components/AuthorizationFrom/AuthorizationForm.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
import MainPage from './pages/mainPage/mainPage.jsx'
import {Routes, Route, useNavigate} from 'react-router-dom';
import ProjectPage from "./pages/ProjectPage/ProjectPage";

const tg = window.Telegram.WebApp;



function App() {
  const navigate = useNavigate()
  useEffect(() => {
    tg.ready();
    navigate("/login")
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthorizationForm/>}/>
        <Route path="/registration" element={<RegistrationForm/>}/>
        <Route path="/projects" element={<MainPage/>}/>
        <Route path="/projects/:id" element={<ProjectPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
