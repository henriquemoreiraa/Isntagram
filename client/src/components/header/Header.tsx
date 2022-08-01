import { Link } from "react-router-dom";
import { Context } from '../../context/AuthContext';
import { useContext } from 'react';
import Notification from "./Notification";
import './header.css'
import { IoCompassOutline, IoHomeOutline } from 'react-icons/io5'
import { User } from '../../routes/home/types'

type Props = {
    user: User | undefined
}

function Header({ user }: Props) {
    const { handleLogout } = useContext(Context)

    return (
        <header>
            <div className="header">
                <div className="headerItems">
                    <div>
                      CringeGram
                    </div>
                    <div>
                        <input className="search" type="text" placeholder="Search" />
                    </div>
                    <ul>
                        <li>
                            <IoHomeOutline size={'1.7em'} />
                        </li>
                        <li>
                            <IoCompassOutline size={'1.7em'}/>
                        </li>
                        <li>
                            <Notification />
                        </li>
                        {user ? <li>
                            <div className="divImg2"><img src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`} alt="" /></div>
                        </li> : ''}
                        {/* <li>
                            <Link onClick={() => handleLogout()} to={'/login'}>Logout</Link>
                        </li> */}
                        
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
