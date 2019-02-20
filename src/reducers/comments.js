import { ADD_COMMENT, RECEIVE_COMMENTS, DELETE_COMMENT, VOTE_COMMENT, EDIT_COMMENT } from '../actions/comments'


export default function comments (state = {}, action) {
  const {comment} = action;
  console.log("state",state);
  switch(action.type) {
    case RECEIVE_COMMENTS :
      return {
        ...state,
        ...action.comments
      }
    case ADD_COMMENT :
      return {
        ...state,
        [comment.id]: comment,
      }
    case DELETE_COMMENT :
      return Object.values(state).filter((commentItem) =>
        (commentItem.id !== comment.id))
    case VOTE_COMMENT :
      return Object.values(state).map((commentItem) => 
        commentItem.id !== action.id ? commentItem :
        Object.assign({}, commentItem, { voteScore: action.option === 'upVote' ? commentItem.voteScore + 1 : commentItem.voteScore - 1  }))
    case EDIT_COMMENT :
        return Object.values(state).map((commentItem) => 
          commentItem.id !== comment.id ? commentItem :
          Object.assign({}, commentItem, { body: comment.body }))
    default:
    return state
  }
}
