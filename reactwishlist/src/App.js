import './App.css';
import { Route, Routes } from "react-router-dom";
import CreateUserComponent from './Components/CreateUserComponent';

let App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul className='navbar'>
            <li>Index</li>
            <li>Register</li>
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
        </Routes>
      </main>
      <footer>
        &copy; 2024 Wishlist app
      </footer>
    </div>
  );
}

export default App;