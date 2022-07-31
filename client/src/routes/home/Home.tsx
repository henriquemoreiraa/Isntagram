import api from '../../api';
import './home.css'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import io from 'socket.io-client';
import { Posts, User } from './types'
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);
// post.post_img.key


function Home() {
    const [posts, setPosts] = useState<Posts>([])
    const [user, setUser] = useState<User>()

    const { authenticated, setAuthenticated } = useContext(Context)
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')

    useEffect(() => {
      if (authenticated) {
        
        (async () => {
          const { data } = await api.get(`/posts/post/${id}`)
          const posts: Posts | any = []
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
      <div className='container'>
        <Header />
        {/* <button onClick={sendNotification}>AQUI</button> */}
        <div className='containerPosts-userFollowing'>
          <div>
            { posts ?
              posts.map(post => (
                <div className='post'>
                  <div className='user'>
                    <div className='userImg-name'>
                      <div className='divImg1'><img src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`} alt="" height={'33px'}/></div>
                      <p>{post.user.name}</p>
                    </div>
                    <div>
                      ...
                    </div>
                  </div>
                  <div className='postImg'>
                    <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`} alt="" />
                  </div>
                  <div className='postTitle'>
                    <p><strong>{post.user.name}</strong> {post.title}</p>
                  </div>
                  <h4>{post.likes.length}Likes</h4>
                    {post.comments.map(comment => (
                  <>
                    <div>
                      <h3>Comments</h3>
                        <img className='userImg' src={`${process.env.REACT_APP_API_URL}${comment.user.user_img}`} alt="" height='33px' />
                        <p>{comment.user.name}</p>
                        <p>{comment.comment}</p>
                    </div>
                      <>
                        {comment.answers.map(answer => (
                          <div>
                            <h4>Answers</h4>
                            <img src={`${process.env.REACT_APP_API_URL}${answer.user.user_img}`} alt="" height='40px'/>
                            <h6>{answer.user.name}</h6>
                            <p>{answer.answer}</p>
                          </div>
                        ))}
                      </>
                  </>
            
                    ))}
                </div>
            
                )) : '' } 
          </div>
              { user ?
          <div className='userFollowing'>               
              <div className='user'>
                <div className='userImg-name'>
                  <div className='divImg'>
                     <img className="" src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`} alt="" />
                  </div>
                  <p>{user.name}</p>
                </div>
              </div>
              <div className='followedUsers'>
              <p>Followed users</p>
              <div className='user'>
                <div className='userImg-name'>
                  {user.following.map(user => (
                    <>
                      <div className='divImg1'>
                        <img className="" src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`} alt="" />
                        </div>
                        <p>{user.name}</p>
                    </>
                  ))}
                </div>
              </div>
              </div>
          </div>
                : ''
              }
          

        </div>

        
      </div>
    )
}

export default Home