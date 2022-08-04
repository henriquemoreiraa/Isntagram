import { useEffect, useState, useContext } from 'react';
import { PostsType, User } from '../../routes/home/types';
import './post.css';
import { IoEllipsisHorizontalSharp, IoClose } from 'react-icons/io5'
import { BsDot } from 'react-icons/bs'
import { Context } from '../../context/AuthContext';
import Comment from '../comment/Comment'

type Props = {
    postId: string;
    posts: PostsType | undefined;
    user: User | undefined
    page: string
    setSinglePost: (e: boolean) => void
}

function Post({ postId, posts, user, page, setSinglePost }: Props) {
    const [post, setPost] = useState<PostsType>()
    const [commentPost, setCommentPost] = useState(false)
    const id = localStorage.getItem('userId')
    const { handleFollow, handleUnfollow } = useContext(Context)

    useEffect(() => {
        const filterPost = posts?.filter(post => post._id === postId)
        setPost(filterPost)
    }, [])

  return (
    <div className='singlePostContainer'>
        <div className='closePost' onClick={() => setSinglePost(false)}><IoClose size={'1.7em'} color={'fff'}/></div>
        { post ?
            post.map(post => (
            <div className='singlePostDiv'>
                <div className='imgDiv3'>
                    <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`} alt="" />
                </div>
                <div>
                    <div className='commentsDiv'>
                        <div className='user uimgName-comment'>
                            <div className='userImg-name'>
                                <>
                                    <div className='divImg1'>
                                    <img className="" src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`} alt="" />
                                    </div>
                                    <p>{post.user.name}</p>
                                    <BsDot size={'1.3em'}/>
                                    { user?.following.length === 0 ? <p onClick={() => handleFollow(post.user.user_id, id)} className='unfollowFollow'>Follow</p> :
                                        user?.following.some(userfo => (
                                            userfo.user_id === post.user.user_id )) === true ?
                    
                                            <p onClick={() => handleUnfollow(post.user.user_id, id)} className='unfollowFollow'>Following</p>
                                            :
                                            <p onClick={() => handleFollow(post.user.user_id, id)} className='unfollowFollow'>Follow</p>
                                    }
                    
                                </>
                            </div>
                    
                            <div>
                                <IoEllipsisHorizontalSharp size={'1.2em'}/>
                            </div>
                        </div>
                    
                    </div>
                    
                    <div className='comments'>
                        {/* <div></div> */}
                    <div className='userTitleComments'>
                        <div className='userImg-name'>
                            <div className='divImg1'>
                                <img src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`} alt="" />
                            </div>
                            <p><strong>{post.user.name}</strong>{post.title}</p>
                        </div>
                        { post.comments.map(comment => (
                        
                        
                              <div className='userImg-name'>
                                <div className='divImg1' >
                                    <img src={`${process.env.REACT_APP_API_URL}${comment.user.user_img}`} alt="" /></div>
                                  <p><strong>{comment.user.name}</strong>{comment.comment}</p>
                              </div>
                        
                        
                        
                          ))
                          }
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
                          <p>f</p>
      
                    </div>
                        <div className='postLikeComment'>
                            <div>teste</div>
                            <Comment postId={post._id}  commentPost={commentPost} setCommentPost={setCommentPost}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )) : '' }
    </div>
  )
}

export default Post