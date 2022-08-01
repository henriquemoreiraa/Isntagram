import { useEffect, useState, useContext } from 'react';
import { PostsType, User } from '../../routes/home/types';
import './post.css';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { BsDot } from 'react-icons/bs'
import { Context } from '../../context/AuthContext'

type Props = {
    postId: string;
    posts: PostsType;
    user: User | undefined
}

function Post({ postId, posts, user }: Props) {
    const [post, setPost] = useState<PostsType>()
    const id = localStorage.getItem('userId')

    useEffect(() => {
        const filterPost = posts.filter(post => post._id === postId)
        setPost(filterPost)
    }, [])
    
    const { handleFollow, handleUnfollow } = useContext(Context)

  return (
    <div className='singlePostContainer'>
        { post ?
            post.map(post => (
            <div className='singlePostDiv'>
                <div className='imgDiv3'>
                    <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`} alt="" />
                </div>
                <div className='commentsDiv'>
                    <div className='user uimgName-comment'>
                        <div className='userImg-name'>
                            <>
                                <div className='divImg1'>
                                <img className="" src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`} alt="" />
                                </div>
                                <p>{post.user.name}</p>
                                <BsDot size={'1.3em'}/>
                                   
                                {post.user.user_id === id ? <p>You</p> :
                                    user?.following.length === 0 ? <p onClick={() => handleFollow(post.user.user_id, id)} className='unfollowFollow'>Follow</p> :
                                    user?.following.map(user => (
                                          post.user.user_id === user.user_id ?
                                        <p onClick={() => handleUnfollow(post.user.user_id, id)} className='unfollowFollow'>Following</p> :
                                        <p onClick={() => handleFollow(post.user.user_id, id)} className='unfollowFollow'>Follow</p>
                                    
                                    
                                    ))

                                }    
                                
                               
                            </>
                        </div>
                        <div>
                            <IoEllipsisHorizontalSharp size={'1.2em'}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )) : '' }
    </div>
  )
}

export default Post