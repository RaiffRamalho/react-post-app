import { saveComment, deleteComment, saveCommentVote } from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment (author, body, parentId) {
  return (dispatch) => {

    return saveComment({
      author,
      body,
      parentId
    }).then((commentResult) =>{
        dispatch(addComment(commentResult))
      })
  }
}

function delComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function handleDeleteComment (id) {
  return (dispatch) => {
    return deleteComment(id)
      .then((deleteResult) =>{
        dispatch(delComment(deleteResult))
      })
  }
}

function voteComment ({ id, option, value }) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
    value
  }
}

export function handleVoteComment (info) {
  return (dispatch) => {
    
    dispatch(voteComment(info))

    return saveCommentVote(info)
      .catch((e) => {
        console.warn('Error in handleVoteComment: ', e)
        dispatch(voteComment(info))
        alert('The was an error liking the Comment. Try again.')
      })
  }
}