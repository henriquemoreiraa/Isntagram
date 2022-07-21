import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000')

function App() {
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    socket.emit('send_message', 'Hello' )
  }

  useEffect(() => {
    socket.on('received_message', (data) => {
      setMessage(data)
    })
  }, [socket])

  return (
    <div>
      <button onClick={sendMessage}>AQUI</button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
