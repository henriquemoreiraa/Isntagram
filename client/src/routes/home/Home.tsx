import api from '../../api';
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import io from 'socket.io-client';
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);

// post.post_img.key
type PostImg = {
    createdAt: string;
    key: string;
    name: string;
    size: number;
    updatedAt: string;
    _id: string
};

type Posts = {
  title: string;
  comments: string[];
  createdAt: string;
  likes: string[];
  post_img: PostImg;
  shares: string[];
  tagged: string[];
  updatedAt: string;
  user_id: string;
  _id: string; 
}[];

function Home() {
    const [posts, setPosts] = useState<Posts>([])

    const { authenticated, setAuthenticated } = useContext(Context)
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')


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
              <h1>{post.title}</h1>
              <h2>{post._id}</h2>
              <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`}  height='100px' alt="" />
            </div>
            
            ))
            
        }

        
      </>
    )
}

export default Home