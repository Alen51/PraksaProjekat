import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Login from './Components/LoginAndRegisterComponents/Login';
import Registration from './Components/LoginAndRegisterComponents/Registration';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [tipKorisnika, setTipKorisnika] = useState('');
  const [statusVerifikacije, setStatusVerifikacije] = useState('');
  const [isKorisnikInfoGot, setIsKorisnikInfoGot] = useState(false);

  const handleKorisnikInfo = (gotKorisnikInfo) => {
    setIsKorisnikInfoGot(gotKorisnikInfo);
  }


  const routes = [
    {path: '/', element: <Home></Home>},
    {path: '/login', element: <Login handleKorisnikInfo={handleKorisnikInfo}></Login>},
    {path: '/registration', element: <Registration handleKorisnikInfo={handleKorisnikInfo}></Registration>},

    
  ]
  

  return (
    <div className="App">
      <NavBar isAuth={isAuth} tipKorisnika = {tipKorisnika} statusVerifikacije={statusVerifikacije} />
      <div className='container'>
        <Routes>
          {
            routes.map((route) => (
              <Route path={route.path} element={route.element}></Route>
            ))
          }
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
