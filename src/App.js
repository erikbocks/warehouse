import { Routes, Route } from "react-router-dom"
import React from 'react';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SignUp from "./components/pages/SignUp";
import Account from "./components/pages/Account";

function App() {
  return (
    <div className={'w-screen h-screen font-inter bg-slate-50'}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
