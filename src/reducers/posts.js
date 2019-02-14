import { RECEIVE_POSTS, ADD_POST } from '../actions/posts'

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }
    case ADD_POST :
      const {post} = action
      return {
        ...state.push(post),
      }
    default:
    return state
  }
}
