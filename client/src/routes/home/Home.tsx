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

type Comments = {
  answers: string[];
  comment: string;
  createdAt: string;
  likes: Likes;
  updatedAt: string[];
  user: {
    name: string;
    user_id: string;
    user_img: string
  };
  _id: string;
}[]

type Likes = {
  bio: string;
  name: string;
  user_img: string;
  _id: string;
}[]

type Posts = {
  title: string;
  comments: Comments;
  createdAt: string;
  likes: Likes;
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
              <div>
                  <img src={`${process.env.REACT_APP_API_URL}${comment.user.user_img}`} alt="" />
                  <h5>{comment.user.name}</h5>
                  <p>{comment.comment}</p>
              </div>                 
                ))}

            </div>
            
            ))
            
        }

        
      </>
    )
}

export default Home