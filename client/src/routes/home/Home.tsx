import api from '../../api';
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import io from 'socket.io-client';
import { PostImg, Answers, Comments, Likes, Posts } from './types'
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);
// post.post_img.key


function Home() {
    const [posts, setPosts] = useState<Posts>([])

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
        })()
      }   
    }, [authenticated === true])
    console.log(posts)        

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
        <Header />
        {/* <button onClick={sendNotification}>AQUI</button> */}
        {
          posts.map(post => (
            <div>
              <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`}  height='100px' alt="" />
              <h1>{post.title}</h1>
              <h4>{post.likes.length}Likes</h4>
                {post.comments.map(comment => (
              <>
                <div>
                  <h3>Comments</h3>
                    <img src={`${process.env.REACT_APP_API_URL}${comment.user.user_img}`} alt="" height='60px' />
                    <h5>{comment.user.name}</h5>
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
            
            ))
            
        }

        
      </>
    )
}

export default Home