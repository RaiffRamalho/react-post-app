import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';
import NewCommentDialog from './NewCommentDialog';
import { FaArrowLeft } from 'react-icons/fa';


class PostPage extends Component {

  state = {
    parentId: this.props.post ? this.props.post.id: '',
  };

  handleBack =() =>{
    this.props.history.push(`/`);
  }

  render() {

    const { parentId } = this.state;
    const hasId = this.props.post;
    if(!this.props.post){
      this.handleBack();
    }

    return (
      <div>
        <FaArrowLeft className='back' onClick={this.handleBack} />
        <h3>Post Details</h3>
        {hasId && (
          <div>

          <Post id={this.props.post.id} />

          <ul className='list-container' style={{listStyle: 'none'}}>
              <NewCommentDialog
                parentId={parentId}
              />
              <hr></hr>
              Comment List
              {
                this.props.postComments.map((comment) => (
                  <li key={comment.id}>
                    <Comment id={comment.id}/>
                  </li>
                  ))
              }
            </ul>
            </div>
        )}
        
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {

  let id = '';
  if(ownProps.location.state) id = ownProps.location.state.id;

  const post = Object.values(state.posts).filter((post) => ( 
    post.id === id
    ))[0];
  const postComments = Object.values(state.comments).filter((comment) => ( 
    comment.parentId === id
    ));

  return {
    post: post,
    postComments: postComments
  }
}


export default connect(mapStateToProps)(PostPage)