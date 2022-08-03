import { PostsType, User } from '../../routes/home/types'
import { IoEllipsisHorizontalSharp, IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { useEffect, useState, useContext } from 'react';
import Post from './Post';
import api from '../../api'
import { Context } from '../../context/AuthContext';
import Comment from '../comment/Comment'
import io from 'socket.io-client';
const url = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';
const socket = io(url);

type Props = {
    user: User | undefined
    id: string | null
    page: string
}

function Posts({ user, id }: Props) {
  const [posts, setPosts] = useState<PostsType>([])
  const [singlePost, setSinglePost] = useState(false)
  const [postId, setPostId] = useState('')
  const [like, setLike] = useState(false)
  const userId = localStorage.getItem('userId')
  const [commentPost, setCommentPost] = useState(false)

  const { followUnfUser } = useContext(Context)

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/posts/post/${id}`)
      const posts: PostsType | any = []
      for (let i in data) {
        posts.unshift(data[i])
      }

      setPosts(posts)
    })();
  }, [like, followUnfUser, commentPost])

  const handleLike = async (postId: string, userId: string | null, postUserId: string) => {
    await api.put(`/posts/like/${postId}`, {
        id: userId 
    })
    setLike(!like)
    sendNotification(postUserId, user?.name, user?.user_img.key )
  }
  
  const removeLike = async (postId: string, userId: string | null) => {
    await api.put(`/posts/removeLike/${postId}`, {
      id: userId, 
    })
    setLike(!like)
  }

  const sendNotification = (postUserId: string, userName: string | undefined, userImg: string | undefined ) => {
    socket.emit('notification', postUserId)
    socket.emit('notification_send', {id: postUserId, userName, userImg })
  }

  return (
    <div>
      {singlePost && <Post postId={postId} posts={posts} user={user} page={'home'}  setSinglePost={setSinglePost} />}
            { posts ?
              posts?.map(post => (
                <div className='post'>
                  <div className='user'>
                    <div className='userImg-name'>
                      <div className='divImg1'><img src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`} alt="" /></div>
                      <p>{post.user.name}</p>
                    </div>
                    <div>
                      <IoEllipsisHorizontalSharp size={'1.2em'}/>
                    </div>
                  </div>
                  <div onClick={() => (setSinglePost(true), setPostId(post._id))} className='postImg'>
                    <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`} alt="" />
                  </div>
                  <div className='postTitle'>
                    <div className='postLikeCommShare'>
                      <div>
                        {post.likes.length === 0 ?  <IoHeartOutline size={'1.9em'} onClick={() => handleLike(post._id, id, post.user.user_id)}/> :
                        post?.likes.some(postLike => (
                          postLike._id === id )) === true ?
                          // user? post.likes.indexOf(user._id) === -1 ?  
                          <IoHeartSharp size={'1.9em'} color={'e84040'} onClick={() => removeLike(post._id, id)}/>
                             
                          : 
                          <IoHeartOutline size={'1.9em'} onClick={() => handleLike(post._id, id, post.user.user_id)} />
                                              
                          }
                   
                      </div>
                      <div onClick={() => (setSinglePost(true), setPostId(post._id))}>
                        <IoChatbubbleOutline size={'1.8em'} />
                      </div>
                      <div>
                        <IoPaperPlaneOutline size={'1.8em'} />
                      </div>
                    </div>
                  {post.likes.length > 0 && 
                    <div className='likes'>
                      <IoHeartSharp color='e84040' />
                      
                      <p>
                        Liked by <strong>{post.likes[0].name}</strong>
                        {post.likes.length > 1 && `and ${post.likes.length - 1} more 
                        ${post.likes.length - 1 > 1 ? 'users' : 'user'}`
                        }
                        
                        
                      </p>
                    </div>
                  }

                    <p><strong>{post.user.name}</strong>{post.title}</p>

                    {post.comments.length > 0 && 
                    <p className='viewComments' onClick={() => (setSinglePost(true), setPostId(post._id))}>
                       View {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
                    </p>}

                      { post.comments.map(comment => (
                        comment.user.user_id === id ?
                        
                          <p><strong>{comment.user.name}</strong>{comment.comment}</p>
                        
                        
                        : ''
                      ))

                      }

                      <p className='postDate'>{new Date(post.createdAt).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                  </div>
                  
                  
                    <Comment postId={post._id} commentPost={commentPost} setCommentPost={setCommentPost}/>
                </div>
            
                )) : 'loading...' } 
          </div>
  )
}

export default Posts