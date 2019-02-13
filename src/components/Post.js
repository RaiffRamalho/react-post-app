import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaEdit, FaTrash, FaRegStar, FaStar, FaRegCommentAlt } from 'react-icons/fa';


class Post extends Component {
  render(){
    const { post } = this.props;
    const {
      title, body, author, timestamp, commentCount, voteScore
    } = post
    return (
      <div className='post'>
          <div className='post-info'>
          <div className='post-top-icons'>
            <FaEdit />{' '}<FaTrash />
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
            <button>
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