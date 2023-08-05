import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className={'w-screen h-screen font-inter bg-slate-50'}>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home'element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
