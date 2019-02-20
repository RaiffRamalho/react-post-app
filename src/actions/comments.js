import { saveComment, deleteComment, updateComment, saveCommentVote } from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
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

function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export function handleEditComment (id, body) {
  return (dispatch) => {

    return updateComment({
      id,
      body
    }).then((putResult) =>{
        dispatch(editComment(putResult))
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

function voteComment ({ id, option }) {
  return {
    type: VOTE_COMMENT,
    id,
    option
    }
}

export function handleVoteComment (info) {
  return (dispatch) => {
    
    dispatch(voteComment(info))

    return saveCommentVote(info)
      .catch((e) => {
        console.warn('Error in handleVoteComment: ', e)
        const option = info.option === 'upVote' ? 'downVote' : 'upVote';
        dispatch(voteComment(
            info.id,
            option
          ))
        alert('The was an error liking the Comment. Try again.')
      })
  }
}