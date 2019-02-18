import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { FaEdit, FaTrash, FaStar, FaRegCommentAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { handleVotePost, handleDeletePost } from '../actions/posts';
import { NavLink } from 'react-router-dom';


class Post extends Component {

  handleUpVote = (e) => {
    e.preventDefault()
    const { dispatch, post  } = this.props
    dispatch(handleVotePost({
      id: post.id,
      option: 'upVote',
      value: 1
    }))
  }

  handleDownVote = (e) => {
    e.preventDefault()
    const { dispatch, post  } = this.props
    dispatch(handleVotePost({
      id: post.id,
      option: 'downVote',
      value: -1
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
            <NavLink style={{color:'white'}} to={{ pathname: '/new', state: { edit: true, post: post} }} >
              <FaEdit />
            </NavLink>
            {' '}
            <FaTrash onClick={this.handleDelete}/>
          </div>
            <div>
              <span className='author'>By: {author}</span>< br />
              <div className='date'>{formatDate(timestamp)}</div>< br />
              <p className='title'>{title}</p>
              <p className='body'>{body}</p>
            </div>
          <div className='post-down-icons'>
            <FaRegCommentAlt className='bottom-icon' />
            {' '}
            <span>{commentCount}</span>
            {' '}
            <FaPlus className='bottom-icon' onClick={this.handleUpVote}/>
            {' '}
            {voteScore > 0 ? <FaStar color='#ffcc00'/> : voteScore < 0 ? <FaStar color='#ef0707' /> : <FaStar/>}
            {' '}
            <span>{voteScore}</span>
            {' '}
            <FaMinus className='bottom-icon' onClick={this.handleDownVote}/>
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