import { Routes, Route} from "react-router-dom"
import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
import Account from './pages/Account';

function App() {
  return (
    <div className={'w-screen h-screen font-inter bg-slate-50'}>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path='/account' element={<Account/>}/>
      </Routes>
    </div>
  );
}

export default App;
