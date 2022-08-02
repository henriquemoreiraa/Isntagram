import { useEffect, useState, useContext } from 'react';
import { PostsType, User } from '../../routes/home/types';
import './post.css';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { BsDot } from 'react-icons/bs'

type Props = {
    postId: string;
    posts: PostsType | undefined;
    user: User | undefined
    page: string
}

function Post({ postId, posts, user, page }: Props) {
    const [post, setPost] = useState<PostsType>()

    useEffect(() => {
        const filterPost = posts?.filter(post => post._id === postId)
        setPost(filterPost)
    }, [])

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

                                { user?.following.map(userfo => (
                                    userfo.user_id.indexOf(post.user.user_id) === -1 ?
                                    <p className='unfollowFollow'>Follow</p>

                                    :
                                    
                                    <p className='unfollowFollow'>Following</p>
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