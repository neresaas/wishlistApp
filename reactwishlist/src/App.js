import './App.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import CreateUserComponent from './Components/CreateUserComponent';
import LoginUserComponent from './Components/LoginUserComponent';
import { useEffect, useState } from 'react';
import { backendURL } from './Globals';

let App = () => {

  let [login, setLogin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("apiKey") != null) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, []);

  let disconnect = async () => {
    await fetch (backendURL + "/users/disconnect?apiKey=" + localStorage.getItem("apiKey"))

    localStorage.removeItem("apiKey")

    setLogin(false)

    navigate("/login")
  }

  return (
    <div>
      <header>
        <nav>
          <ul className='navbar'>
            <li><Link to="/">Index</Link></li>
            { !login && <li><Link to="/register">Register</Link></li> }
            { !login && <li><Link to="/login">Login</Link></li> }
            { login && <li><Link to="#" onClick={disconnect}>Disconnect</Link></li>}
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <Routes>
          <Route path="/" element={
            <p>Index of Website</p>
          }/>

          <Route path="/register" element={
            <CreateUserComponent/>
          }/>

          <Route path="/login" element={
            <LoginUserComponent setLogin={setLogin}/>
          }/>
        </Routes>
      </main>
      <footer>
        &copy; 2024 Wishlist app
      </footer>
    </div>
  );
}

export default App;