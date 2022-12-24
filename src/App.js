import './App.css'
import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className={'App'}>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home'element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
