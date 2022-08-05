import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './routes/loginRegister/Login';
import Register from './routes/loginRegister/Register';
import Home from './routes/home/Home';
import { AuthContext } from './context/AuthContext';
import Explore from './routes/explore/Explore';


function App() {
  return (
    <AuthContext>
      <Router>
        <div className="container">
          <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          </Routes>
        </div>
      </Router>
    </AuthContext>
  );
}

export default App;
