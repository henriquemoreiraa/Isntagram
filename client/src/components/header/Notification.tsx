import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/AuthContext';
import io from 'socket.io-client';
import { BsDot } from 'react-icons/bs'
import { IoNotificationsOutline } from 'react-icons/io5'
import { textSpanEnd } from 'typescript';
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);

type Notification = {
    userName: string,
    userImg: string
}

function Notification() {
    const [notification, setNotification] = useState<Notification | undefined>()
    const [newNotification, setnewNotification] = useState<string | null>()
    const id = localStorage.getItem('userId')

    useEffect(() => {
        setnewNotification(localStorage.getItem('notification'))

        socket.emit('notification', id )

        socket.on('send_notification', (data) => {
            setNotification(data)
            localStorage.setItem('notification', 'NEW')
        })

        setTimeout(() => {
            setNotification(undefined)
        }, 10000)
    }, [notification])

    const removeNewNotification = () => {
        localStorage.removeItem('notification')
        setnewNotification(null)
    }

    return (
        <div>
            <div onClick={removeNewNotification} className='testew'><IoNotificationsOutline size={'1.8em'}  className='notificationsvg'/> 
            {newNotification && <BsDot className='dotnot' color='#f76363' size={'1.5em'}/>}
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