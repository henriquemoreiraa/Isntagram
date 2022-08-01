import { PostsType, User } from '../../routes/home/types'
import { IoEllipsisHorizontalSharp, IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { useState } from 'react';
import Post from './Post'

type Props = {
    posts: PostsType
    user: User | undefined
}

function Posts({ posts, user }: Props) {
  const [like, setLike] = useState(false)
  const [singlePost, setSinglePost] = useState(false)
  const [postId, setPostId] = useState('')

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
                      <div onClick={() => setLike(!like)}>
                        {!like ? 
                          <IoHeartOutline size={'1.9em'} /> :
                          <IoHeartSharp size={'1.9em'} color={'e84040'}/>
                        }
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