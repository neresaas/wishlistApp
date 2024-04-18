import "antd/dist/reset.css"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { Layout, Menu, notification } from "antd";

let App = () => {

  const [api, contextHolder] = notification.useNotification();

  let [login, setLogin] = useState(false);

  let navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    checkLogin();
  }, [])

  let checkLogin = async () => {
    if (localStorage.getItem("apiKey") != null) {
      let response = await fetch (backendURL + "/users/checkLogin?apiKey=" + localStorage.getItem("apiKey"))

      if (response.status == 401) {
        setLogin(false);
        navigate("/login")
        return

      } else {
        setLogin(true);
      }

    } else {
      setLogin(false);

      let href = location.pathname

      if ( ["/login", "/register"].includes(href) == false ) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("apiKey") != null) {
      setLogin(true)

    } else {
      setLogin(false)
      
    }
  }, []);

  let createNotification = (msg, type="info", placement="top") => {
    api[type] ({
      message: msg,
      description: msg,
      placement
    })
  }

  let disconnect = async () => {
    await fetch (backendURL + "/users/disconnect?apiKey=" + localStorage.getItem("apiKey"))

    localStorage.removeItem("apiKey")

    setLogin(false)

    navigate("/login")
  }

  let { Header, Content, Footer } = Layout

  return (
    <>
      {contextHolder}
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Header>
            { !login && (
              <Menu theme="dark" mode="horizontal" items= {[
                { key: "menuRegister", label: <Link to="/register">Register</Link> },
                { key: "menuLogin", label: <Link to="/login">Login</Link> },
              ]}>
              </Menu>
            )}

            { login && (
              <Menu theme="dark" mode="horizontal" items= {[
                { key: "menuCreatePresent", label: <Link to="/createPresent">Create present</Link> },
                { key: "menuMyPresents", label: <Link to="/myPresents">My presents</Link> },
                { key: "menuFriends", label: <Link to="/friends">Friends</Link> },
                { key: "menuGift", label: <Link to="/gift">Gift</Link> },
                { key: "menuDisconnect", label: <Link to="#" onClick={disconnect}>Disconnect</Link> }
              ]}>
              </Menu>
            )}    
          </Header>
          <Content style={{ padding: "20px 50px" }}>
            <Routes>
              <Route path="/" element={
                <h2>Index of Website</h2>
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
                <GiftFriendComponent createNotification={createNotification}/>
              }/>

              <Route path="/gift/:presentId" element={
                <PresentFriendsComponent createNotification={createNotification}/>
              }/>
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <p>&copy; 2024 Wishlist app</p>
          </Footer>
        </Layout>
    </>
  );
}

export default App;