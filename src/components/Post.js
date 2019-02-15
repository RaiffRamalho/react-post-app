import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaEdit, FaTrash, FaStar, FaRegCommentAlt } from 'react-icons/fa';
import { handleTogglePost, handleDeletePost } from '../actions/posts'



class Post extends Component {

  handleLike = (e) => {
    e.preventDefault()
    const { dispatch, post  } = this.props
    dispatch(handleTogglePost({
      id: post.id,
    }))
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleDeletePost(post.id))
  }

  render(){
    const { post } = this.props;
    const {
      title, body, author, timestamp, commentCount, voteScore
    } = post
    return (
      <div className='post'>
          <div className='post-info'>
          <div className='post-top-icons'>
            <FaEdit />{' '}<FaTrash onClick={this.handleDelete}/>
          </div>
            <div>
              <span className='author'>By: {author}</span>< br />
              <div className='date'>{formatDate(timestamp)}</div>< br />
              <p className='title'>{title}</p>
              <p className='body'>{body}</p>
            </div>
          <div className='post-down-icons'>
            <FaRegCommentAlt className='tweet-icon' />
            {' '}
            <span>{commentCount}</span>
            {' '}
            <button onClick={this.handleLike}>
              {voteScore > 0 
                ? <FaStar color='#ffcc00'/>
                : <FaStar/>}
            </button>
            {' '}
            <span>{voteScore}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({posts}, { id }) {
  const post = Object.values(posts).filter((post) => ( post.id ===id))[0]

  return {
    post: post,
  }
}
 
export default connect(mapStateToProps)(Post)