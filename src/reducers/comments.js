import { RECEIVE_COMMENTS, DELETE_COMMENT, VOTE_COMMENT } from '../actions/comments'


export default function posts (state = {}, action) {
  const {comment} = action;
  switch(action.type) {
    case RECEIVE_COMMENTS :
      return {
        ...state,
        ...action.comments
      }
    case DELETE_COMMENT :
      return Object.values(state).filter((commentItem) =>
        (commentItem.id !== comment.id))
    case VOTE_COMMENT :
      return Object.values(state).map((commentItem) => 
        commentItem.id !== action.id ? commentItem :
        Object.assign({}, commentItem, { voteScore: commentItem.voteScore+ action.value }))
    default:
    return state
  }
}
