import { savePost } from '../utils/api'


export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POSTS'


export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function handleAddPost (title, body, author, category) {
  return (dispatch) => {
    

    return savePost({
      title,
      body,
      author,
      category
    }).then((postResult) =>{
        dispatch(addPost(postResult))
      }
      )
  }
}
