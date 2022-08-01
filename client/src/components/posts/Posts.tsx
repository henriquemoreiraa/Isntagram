import { PostsType } from '../../routes/home/types'
import {IoEllipsisHorizontalSharp} from 'react-icons/io5'


type Props = {
    posts: PostsType
}

function Posts({ posts }: Props) {
  return (
    <div>
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
                  <div className='postImg'>
                    <img src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`} alt="" />
                  </div>
                  <div className='postTitle'>
                    <p><strong>{post.user.name}</strong> {post.title}</p>
                  </div>
                  <h4>{post.likes.length}Likes</h4>
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