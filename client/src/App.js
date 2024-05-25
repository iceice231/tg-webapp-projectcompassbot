import {createContext, useContext, useEffect, useState} from 'react';
import './App.css';
import AuthorizationForm from './components/AuthorizationFrom/AuthorizationForm.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
import MainPage from './pages/mainPage/mainPage.jsx'
import {Routes, Route, useNavigate} from 'react-router-dom';
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageReports from "./pages/PageReports/PageReports";
import StaffPage from "./pages/StaffPage/StaffPage";
import PersonalUserPage from "./pages/PersonalUserPage/PersonalUserPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";

const tg = window.Telegram.WebApp;

const UserContext = createContext(null);

function App() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  useEffect(() => {
    tg.ready();
    const initData = tg.initDataUnsafe;
    setUser(initData?.user?.username)
    console.log(initData)
    navigate("/login")
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthorizationForm username={user}/>}/>
        <Route path="/registration" element={<RegistrationForm/>}/>
        <Route path="/projects" element={<MainPage/>}/>
        <Route path="/projects/:id" element={<ProjectPage/>}/>
        <Route path="/projects/:id/task/:idTask" element={<TaskPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/reports" element={<PageReports/>}/>
        <Route path={"/staff"} element={<StaffPage/>}/>
        <Route path={"/staff/user/:idUser"} element={<PersonalUserPage/>}/>
        <Route path={"/notification"} element={<NotificationPage/>}/>
      </Routes>
    </div>
  );
}

export function useUser() {
  return useContext(UserContext)
}

export default App;
