import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';

function Home() {
    const { authenticated } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (authenticated === false) {
          navigate('/login')
        }
      }, [authenticated])

  return (
    <div>Home</div>
  )
}

export default Home