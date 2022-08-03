import { PostsType, User } from '../../routes/home/types'
import { IoEllipsisHorizontalSharp, IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { useEffect, useState, useContext } from 'react';
import Post from './Post';
import api from '../../api'
import { response } from 'express';
import { Context } from '../../context/AuthContext';

type Props = {
    user: User | undefined
    id: string | null
    page: string

}

function Posts({  user, id }: Props) {
  const [posts, setPosts] = useState<PostsType>([])
  const [singlePost, setSinglePost] = useState(false)
  const [postId, setPostId] = useState('')
  const [like, setLike] = useState(false)
  const userId = localStorage.getItem('userId')

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
  }, [like, followUnfUser])

  const handleLike = async (postId: string, userId: string | null) => {
    await api.put(`/posts/like/${postId}`, {
        id: userId 
    })
    setLike(!like)
  }
  
  const removeLike = async (postId: string, userId: string | null) => {
    await api.put(`/posts/removeLike/${postId}`, {
      id: userId, 
    })
    setLike(!like)
  }

  return (
    <div>
      {singlePost && <Post postId={postId} posts={posts} user={user} page={'home'}/>}
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
                        {post.likes.length === 0 ?  <IoHeartOutline size={'1.9em'} onClick={() => handleLike(post._id, id)}/> :
                          user? post.likes.indexOf(user._id) === -1 ?  
                             
                            <IoHeartOutline size={'1.9em'} onClick={() => handleLike(post._id, id)} />
                            : 
                            
                            <IoHeartSharp size={'1.9em'} color={'e84040'} onClick={() => removeLike(post._id, id)}/>
                            
                          : ''
                            
                            
                          }
                          {/* { postId === post._id && <IoHeartSharp size={'1.9em'} color={'e84040'}/>}
                          {removeLikes && <IoHeartOutline size={'1.9em'} onClick={() => handleLike(post._id, id)} />} */}
                          
                          
                                 
                      
                      </div>
                      <div onClick={() => (setSinglePost(true), setPostId(post._id))}>
                        <IoChatbubbleOutline size={'1.8em'} />
                      </div>
                      <div>
                        <IoPaperPlaneOutline size={'1.8em'} />
                      </div>
                    </div>
                  {post.likes.length > 0 && <p><strong>{post.likes.length}</strong>Likes</p>}
                    <p><strong>{post.user.name}</strong> {post.title}</p>
                    {post.comments.length >= 0 && <div onClick={() => (setSinglePost(true), setPostId(post._id))}>
                      View all {post.comments.length} comments
                    </div>}
                  </div>
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
            
                )) : 'loading...' } 
          </div>
  )
}

export default Posts