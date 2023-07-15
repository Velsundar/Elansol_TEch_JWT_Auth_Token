import React from 'react';
import Login from './Components/Login';
import Registration from './Components/Registration';
import {Route, Routes} from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/registration" element={<Registration/>} />
      <Route exact path="/home" element={<Home/>} />
      </Routes>
  </div>
  );
}

export default App;
