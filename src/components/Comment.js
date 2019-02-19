import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaEdit, FaTrash, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { handleVoteComment, handleDeleteComment } from '../actions/comments';

class Comment extends Component{

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e, body) {
    e.preventDefault();
    const { comment  } = this.props
    this.props.handleEdit(comment.id, body)
  }

  handleUpVote = (e) => {
    e.preventDefault();
    const { dispatch, comment  } = this.props
    dispatch(handleVoteComment({
      id: comment.id,
      option: 'upVote',
      value: 1
    }))
  }

  handleDownVote = (e) => {
    e.preventDefault();
    const { dispatch, comment  } = this.props
    dispatch(handleVoteComment({
      id: comment.id,
      option: 'downVote',
      value: -1
    }))
    
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { dispatch, comment } = this.props
    dispatch(handleDeleteComment(comment.id))
  }
  
  render(){
    const { comment, handleEdit } = this.props;
    const {
      author, body, voteScore
    } = comment
    return (
      <div className='post'>
          <div className='post-info'>
            <div className='post-top-icons'>
              {' '}
              <FaEdit onClick={(e) => this.handleEdit(e, body)}/>
              {' '}
              <FaTrash onClick={this.handleDelete}/>
            </div>
              <div>
                <span className='author'>By: {author}</span>< br />
                <p className='body'>{body}</p>
              </div>
            <div className='post-down-icons'>
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

function mapStateToProps ({comments}, {id}) {
  const comment = Object.values(comments).filter((comment) => ( comment.id ===id))[0]

  return {
    comment: comment,
  }
}

export default connect(mapStateToProps)(Comment)