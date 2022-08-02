import { PostsType, User } from '../../routes/home/types'
import { IoEllipsisHorizontalSharp, IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { useState } from 'react';
import Post from './Post';
import api from '../../api'

type Props = {
    posts: PostsType
    user: User | undefined
    id: string | null
}

function Posts({ posts, user, id }: Props) {
  const [like, setLike] = useState(false)
  const [removeLikes, setRemoveLikes] = useState(false)
  const [singlePost, setSinglePost] = useState(false)
  const [postId, setPostId] = useState('')

  const handleLike = async (postId: string, userId: string | null) => {
    const { data } = await api.put(`/posts/like/${postId}`, {
        id: userId 
    })
}

const removeLike = async (postId: string, userId: string | null) => {
    const { data } = await api.put(`/posts/removeLike/${postId}`, {
        id: userId, 
    })
}

  return (
    <div>
      {singlePost && <Post postId={postId} posts={posts} user={user}/>}
            { posts ?
              posts.map(post => (
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
                        {post.likes.length === 0 ? !like && <IoHeartOutline size={'1.9em'} onClick={() => (handleLike(post._id, id), setLike(!like))}/> :
                          post.likes.map(postUser => (
                            postUser._id === id ? !like &&
                            <IoHeartOutline size={'1.9em'} onClick={() => (handleLike(post._id, id), setLike(!like))} /> : !removeLikes &&
                            <IoHeartSharp size={'1.9em'} color={'e84040'} onClick={() => (removeLike(post._id, id), setRemoveLikes(true))}/>
                        )) 
                        
                      }
                      {like && <IoHeartSharp size={'1.9em'} color={'e84040'} onClick={() => (removeLike(post._id, id), setLike(!like))} />}      
                      {removeLikes && <IoHeartOutline size={'1.9em'} onClick={() => (handleLike(post._id, id), setLike(false), setRemoveLikes(false))} />}      
                                 
                      
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
            
                )) : '' } 
          </div>
  )
}

export default Posts