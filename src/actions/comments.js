import { deleteComment, saveCommentVote } from '../utils/api'


export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
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