import { RECEIVE_POSTS, ADD_POST, DELETE_POST } from '../actions/posts'


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
        (postItem.id !== post.id
      ))
    default:
    return state
  }
}
