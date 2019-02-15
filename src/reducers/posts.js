import { RECEIVE_POSTS, ADD_POST, DELETE_POST, VOTE_POST } from '../actions/posts'


export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
    return {
      ...state,
      ...action.posts
    }
    case ADD_POST :
      const {post} = action;
      return {
        ...state,
        [post.id]: post,
      }
    case DELETE_POST :
      return Object.values(state).filter((postItem) =>
        (postItem.id !== post.id
      ))
    case VOTE_POST :
      return Object.values(state).map((postItem) => postItem.id !== action.id ? postItem :
      Object.assign({}, postItem, { voteScore: postItem.voteScore+ action.value }))
    default:
    return state
  }
}
