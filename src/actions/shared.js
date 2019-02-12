import { getInitialCategoryData, getInitialPostData } from '../utils/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'

export function handleInitialCategoryData () {
  return (dispatch) => {
    return getInitialCategoryData()
    .then(({categories})=>{
      dispatch(receiveCategories(categories))
    })
  }
}

export function handleInitialPostData () {
  return (dispatch) => {
    return getInitialPostData()
    .then((data)=>{
      dispatch(receivePosts(data))
    })
  }
}