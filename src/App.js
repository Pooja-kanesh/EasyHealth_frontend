import './App.css';
import { Routes, Route } from "react-router-dom";

// import Header from './components/Header';
import Home from "./components/Home";
import Login from './components/Login'
import Register from './components/Register';
import UserHome from './components/UserHome';
import ViewDetails from './components/ViewDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserHome />} />
        <Route path='/viewDetails' element={<ViewDetails />} />
      </Routes>
    </div>
  );
}

export default App;
