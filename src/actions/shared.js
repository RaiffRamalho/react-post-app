import { getInitialCategoryData, getInitialPostData, getInitialCommentData } from '../utils/api';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { receiveComments } from './comments';

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
    .then((posts)=>{
      dispatch(receivePosts(posts));
      
      posts.forEach(post => {
        getInitialCommentData(post.id).then((comments)=>{
          dispatch(receiveComments(comments))
        });
      });


    })
  }
}