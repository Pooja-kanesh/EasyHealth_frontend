import './App.css';
import { Routes, Route } from "react-router-dom";

// import Header from './components/Header';
import Home from "./components/Home";
import Login from './components/Login'
import Register from './components/Register';
import UserHome from './components/UserHome';
import ViewDetails from './components/ViewDetails';
import CenterHome from './components/CenterHome';
import Chart from './components/Charts'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserHome />} />
        <Route path='/center' element={<CenterHome />} />
        <Route path='/chart' element={<Chart />} />
        <Route path='/user/viewDetails' element={<ViewDetails />} />
      </Routes>
    </div>
  );
}

export default App;
