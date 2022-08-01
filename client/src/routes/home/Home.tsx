import api from '../../api';
import './home.css'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import io from 'socket.io-client';
import { PostsType, User, User5 } from './types'
import Posts from '../../components/posts/Posts'
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);
// post.post_img.key

function Home() {
    const [posts, setPosts] = useState<PostsType>([])
    const [user, setUser] = useState<User>()
    const [user5, setUser5] = useState<User5>([])
    const [followUnfUser, setFollowUnfUser] = useState<boolean>(true)

    const { authenticated, handleUnfollow, handleFollow } = useContext(Context)
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')

    useEffect(() => {
      if (authenticated) {
        
        (async () => {
          const { data } = await api.get(`/posts/post/${id}`)
          const posts: PostsType | any = []
          for (let i in data) {
            posts.unshift(data[i])
          }
  
          setPosts(posts)
        })();

        (async () => {
          const { data } = await api.get(`/users/user/${id}`)
          
          setUser(data)
        })();
      }   
    }, [authenticated === true])        

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
          <Header user={user}/>
          {/* <button onClick={sendNotification}>AQUI</button> */}
          <div className='containerPosts-userFollowing'>
            <Posts posts={posts} />
        
                { user ?
            <div className='userFollowing'>
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
                    {followUnfUser ?  <div className='unfollowFollow' onClick={() => (handleUnfollow(user.user_id, id), setFollowUnfUser(false))}>
                        Unfollow
                    </div> :
                    <div className='unfollowFollow' onClick={() => (handleFollow(user.user_id, id), setFollowUnfUser(true))}>
                        Follow
                    </div>}
                  </div>
                ))}
                </div>
                <p className='followedUsers'>Your Followers</p>
                {user.following.length < 5 && user.followers.length > 0 &&
                  user.followers.map(user => (
                    <div className='user'>
                    <div className='userImg-name'>
                        <>
                          <div className='divImg1'>
                            <img className="" src={`${process.env.REACT_APP_API_URL}${user.user_img}`} alt="" />
                            </div>
                            <p>{user.name}</p>
                        </>
                    </div>
                  </div>
                  ))
                }
            </div>
                  : ''
                }
        
          </div>
        </div>        
      </>
            )
}

export default Home