import { Link } from "react-router-dom";
import { Context } from '../../context/AuthContext';
import { useContext } from 'react';
import Notification from "./Notification";

function Header() {
    const { handleLogout } = useContext(Context)

    return (
        <header>
            <div>
              Logo
            </div>
            <ul>
                <li>
                    <Notification />  
                </li>
                <li>
                    <Link onClick={() => handleLogout()} to={'/login'}>Logout</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
