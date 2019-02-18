import { savePost, deletePost, saveVote, updatePost } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'

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
      })
  }
}

function editPost (post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function handleEditPost (id ,title, body) {
  return (dispatch) => {

    return updatePost({
      id,
      title,
      body
    }).then((putResult) =>{
        dispatch(editPost(putResult))
      })
  }
}

function delPost (post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function handleDeletePost (id) {
  return (dispatch) => {
    return deletePost(id)
      .then((deleteResult) =>{
        dispatch(delPost(deleteResult))
      })
  }
}

function votePost ({ id, option, value }) {
  return {
    type: VOTE_POST,
    id,
    option,
    value
  }
}

export function handleVotePost (info) {
  return (dispatch) => {
    
    dispatch(votePost(info))

    return saveVote(info)
      .catch((e) => {
        console.warn('Error in handleVotePost: ', e)
        dispatch(votePost(info))
        alert('The was an error liking the Post. Try again.')
      })
  }
}
