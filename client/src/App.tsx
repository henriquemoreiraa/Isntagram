import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000')

function App() {
  const [message, setMessage] = useState('')
  
  const sendNotification = () => {
    socket.emit('notification', '123456')
    socket.emit('notification_send', {id: '123456', message: 'ESSE E UM DADO'})
  }

  useEffect(() => {
    socket.emit('notification', '123456' )

    socket.on('send_notification', (data) => {
      setMessage(data)
    })
  }, [])

  return (
    <div>
      <button onClick={sendNotification}>AQUI</button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
