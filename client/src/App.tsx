import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './routes/loginRegister/Login';
import Register from './routes/loginRegister/Register';
import Home from './routes/home/Home';
import { AuthContext } from './context/AuthContext';
import io from 'socket.io-client';

const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000'
const socket = io(url)

function App() {
  // const [message, setMessage] = useState('')
  
  // const sendNotification = () => {
  //   socket.emit('notification', '123456')
  //   socket.emit('notification_send', {id: '123456', message: 'ESSE E UM DADO'})
  // }

  // useEffect(() => {
  //   socket.emit('notification', '123456' )

  //   socket.on('send_notification', (data) => {
  //     setMessage(data)
  //   })
  // }, [])

  // <button onClick={sendNotification}>AQUI</button>
  // <h1>{message}</h1>
  return (
    <AuthContext>
      <Router>
        <div className="container">
          <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthContext>
  );
}

export default App;
