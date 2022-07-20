import './App.css';
import {Routes, Route} from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import RegistrationPage from "./Pages/RegistrationPage"
import HomePage from "./Pages/HomePage"
import NavBar from "./Components/NavBar"

const urlEndPoint = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<NavBar/>}>
            <Route index element={<HomePage/>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='registration' element={<RegistrationPage/>}/>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
