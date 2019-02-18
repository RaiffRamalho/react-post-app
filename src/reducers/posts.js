import { RECEIVE_POSTS, ADD_POST, DELETE_POST, VOTE_POST, EDIT_POST } from '../actions/posts'


export default function posts (state = {}, action) {
  const {post} = action;
  switch(action.type) {
    case RECEIVE_POSTS :
    return {
      ...state,
      ...action.posts
    }
    case ADD_POST :
      return {
        ...state,
        [post.id]: post,
      }
    case DELETE_POST :
      return Object.values(state).filter((postItem) =>
        (postItem.id !== post.id))
    case VOTE_POST :
      return Object.values(state).map((postItem) => 
        postItem.id !== action.id ? postItem :
        Object.assign({}, postItem, { voteScore: postItem.voteScore+ action.value }))
    case EDIT_POST :
      return Object.values(state).map((postItem) => 
        postItem.id !== action.post.id ? postItem :
        Object.assign({}, postItem, { title: action.post.title, body: action.post.body }))
    default:
    return state
  }
}
