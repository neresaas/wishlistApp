import './App.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { backendURL } from './Globals';
import CreateUserComponent from './Components/CreateUserComponent';
import LoginUserComponent from './Components/LoginUserComponent';
import CreatePresentComponent from './Components/CreatePresentComponent';
import MyPresentsComponent from './Components/MyPresentsComponent';
import DetailsPresentComponent from './Components/DetailsPresentComponent';
import EditPresentComponent from './Components/EditPresentComponent';
import AddFriendsComponent from './Components/AddFriendsComponent';
import MyFriendsComponent from './Components/MyFriendsComponent';
import GiftFriendComponent from './Components/GiftFriendComponent';
import PresentFriendsComponent from './Components/PresentFriendsComponent';

let App = () => {

  let [notification, setNotification] = useState("");

  let createNotification = (msg) => {
    setNotification(msg);
    setTimeout( () => {
      setNotification("");
    }, 3000)
  }

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
            { login && <li><Link to="/createPresent">Create presents</Link></li>}
            { login && <li><Link to="/myPresents">My presents</Link></li>}
            { login && <li><Link to="/friends">Friends</Link></li>}
            { login && <li><Link to="/gift">Gift</Link></li>}
            { login && <li><Link to="#" onClick={disconnect}>Disconnect</Link></li>}
          </ul>
        </nav>

        

      </header>
      <main className="main-container">
        { notification != "" && (
            <div className='notification'>
              { notification }
              <span className='close-btn' onClick={() => {setNotification("")}}>x</span>
            </div>
          )}
        <Routes>
          <Route path="/" element={
            <p>Index of Website</p>
          }/>

          <Route path="/register" element={
            <CreateUserComponent createNotification={createNotification}/>
          }/>

          <Route path="/login" element={
            <LoginUserComponent setLogin={setLogin}/>
          }/>

          <Route path="/createPresent" element={
            <CreatePresentComponent createNotification={createNotification}/>
          }/>

          <Route path="/myPresents" element={
            <MyPresentsComponent createNotification={createNotification}/>
          }/>

          <Route path="/present/:presentId" element={
            <DetailsPresentComponent/>
          }/>

          <Route path="/present/edit/:presentId" element={
            <EditPresentComponent createNotification={createNotification}/>
          }/>

          <Route path="/friends/addFriend" element={
            <AddFriendsComponent createNotification={createNotification}/>
          }/>

          <Route path="/friends" element={
            <MyFriendsComponent createNotification={createNotification}/>
          }/>

          <Route path="/gift" element={
            <GiftFriendComponent/>
          }/>

          <Route path="/gift/:presentId" element={
            <PresentFriendsComponent createNotification={createNotification}/>
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