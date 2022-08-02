import api from '../../api';
import './home.css'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import io from 'socket.io-client';
import { PostsType, User } from './types'
import Posts from '../../components/posts/Posts'
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);
// post.post_img.key

function Home() {
  const [posts, setPosts] = useState<PostsType>([])
  const [user, setUser] = useState<User>()

    const { authenticated, handleUnfollow, handleFollow, followUnfUser } = useContext(Context)
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
 
    useEffect(() => {
      if (authenticated) {
        (async () => {
          const { data } = await api.get(`/users/user/${id}`)
          
          setUser(data)
        })();
      }   
    }, [followUnfUser])        

    useEffect(() => {
      if (authenticated === false) {
        navigate('/login')
      }
    }, [])

    const sendNotification = () => {
      socket.emit('notification', '62dd8f175932bdb3c4c40e1f')
      socket.emit('notification_send', {id: '62dd8f175932bdb3c4c40e1f', message: 'ESSA E UMA NOTIFICACAO'})
    }

    return (
      <>
        <div className='test'></div>
        <div className='container'>
          <Header user={user} page={'home'} />
          {/* <button onClick={sendNotification}>AQUI</button> */}
          <div className='containerPosts-userFollowing'>
            <Posts user={user} id={id} page={'home'} />
        
                { user ?
            <div className='userFollowing'>
                <div className='fixedUserFollowing'>
                  <div className='user'>
                    <div className='userImg-name'>
                      <div className='divImg'>
                         <img className="" src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`} alt="" />
                      </div>
                      <p className='userName'>{user.name}</p>
                    </div>
                  </div>
                  <div className=''>
                  <p className='followedUsers'>Your followed users</p>
                  {user.following.map(user => (
                    <div className='user'>
                      <div className='userImg-name'>
                          <>
                            <div className='divImg1'>
                              <img className="" src={`${process.env.REACT_APP_API_URL}${user.user_img}`} alt="" />
                            </div>
                            <p>{user.name}</p>
                              
                          </>
                          
                      </div>
                      <p onClick={() => handleUnfollow(user.user_id, id) } className='unfollowFollow' >Unfollow</p>
                    </div>
                  ))}
                  </div>
                  <p className='followedUsers'>Your Followers</p>                  
                  {
                    user.followers.map(userf => (
                      <div className='user'>
                      <div className='userImg-name'>
                          <>
                            <div className='divImg1'>
                              <img className="" src={`${process.env.REACT_APP_API_URL}${userf.user_img}`} alt="" />
                              </div>
                              <p>{userf.name}</p>
                          </>
                      </div>
                        
                          
                      </div>
                          ))}
                  
                      

                                
                    
                    
                </div>
            </div>
                  : ''
                }
        
          </div>
        </div>        
      </>
            )
}

export default Home