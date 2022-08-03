import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/AuthContext';
import io from 'socket.io-client';
import { BsDot } from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);

type Notification = {
    userName: string,
    userImg: string
}

function Notification() {
    const [notification, setNotification] = useState<Notification | undefined>()
    const id = localStorage.getItem('userId')

    useEffect(() => {
        socket.emit('notification', id )

        socket.on('send_notification', (data) => {
            setNotification(data)
        })
    }, [])

    return (
        <div>
            <div><IoMdNotificationsOutline size={'1.8em'} className='notificationsvg'/> 
            
            </div>
            {notification && <div className='notificationDiv'>
                <div className='userImg-name'>
                    <div className='divImg1'><img src={`${process.env.REACT_APP_API_URL}${notification?.userImg}`} alt="" /></div>
                    <p><strong>{notification?.userName}</strong></p>
                    <p>liked your post</p>
                </div>
            </div>}
        </div>
    )
}

export default Notification