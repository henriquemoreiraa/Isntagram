import { PostsType, User } from '../../routes/home/types'
import { IoEllipsisHorizontalSharp, IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { useEffect, useState, useContext } from 'react';
import Post from './Post';
import api from '../../api'
import { Context } from '../../context/AuthContext';
import Comment from '../comment/Comment'


type Props = {
    user: User | undefined
    id: string | null
    page: string
}

function Posts({ user, id }: Props) {
  const [posts, setPosts] = useState<PostsType>([])
  const [singlePost, setSinglePost] = useState(false)
  const [postId, setPostId] = useState('')
  const userId = localStorage.getItem('userId')


  const { followUnfUser, authenticated, handleLike, removeLike, commentPost, setCommentPost, setLike, like } = useContext(Context)

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/posts/post/${id}`)

        setPosts(data)
      })();

    }
  }, [like, followUnfUser, commentPost])

  return (
    <div>
      {singlePost && <Post postId={postId} posts={posts} user={user} page={'home'}  setSinglePost={setSinglePost} commentPost={commentPost} setCommentPost={setCommentPost} like={like} setLike={setLike} handleLike={handleLike} removeLike={removeLike} />}
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

                    { post.comments.length > 0 && 
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
                  
                  
                    <Comment postId={post._id} commentPost={commentPost} setCommentPost={setCommentPost} postUser={post.user.user_id} userName={user?.name} userImg={user?.user_img.key}/>
                </div>
            
                )) : 'loading...' } 
          </div>
  )
}

export default Posts