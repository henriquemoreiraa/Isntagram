import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/AuthContext';
import io from 'socket.io-client';
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);

function Notification() {
    const [message, setMessage] = useState('')
    const { userId } = useContext(Context)

    useEffect(() => {
        socket.emit('notification', userId )

        socket.on('send_notification', (data) => {
        setMessage(data)
        })
    }, [])

    return (
        <div>Notification {message}</div>
    )
}

export default Notification