import { useState, useEffect } from 'react';
import './comment.css';
import api from '../../api';

type Props = {
    postId: string
    commentPost: boolean
    setCommentPost: (e: boolean) => void
}

function Comment({ postId, commentPost, setCommentPost}: Props) {
    const [comment, setComment] = useState('')
    const id = localStorage.getItem('userId')

    const handleComment = async () => {
        await api.post(`/comments/post/${postId}`, {
            id,
            comment,
        })
        setCommentPost(!commentPost)
        setComment('')
    }

  return (
    <>
        <div className='commentInputDiv'>
            <input
                className='commentInput'
                placeholder='Add a comment...'
                type="text"
                id='comment'
                name='comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {   comment.length < 1 ?
                <button onClick={handleComment} type='submit' className='commentBtn' disabled> Post </button> :
                <button onClick={handleComment} type='submit' className='commentBtn'> Post </button>
            }
        </div>
    </>
  )
}

export default Comment