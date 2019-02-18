import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment'


class PostPage extends Component {

  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Post Details</h3>
        <Post id={this.props.post.id} />
        <ul className='list-container' style={{listStyle: 'none'}}>
            Comment List
            {
              this.props.postComments.map((comment) => (
                <li key={comment.id}>
                  <Comment id={comment.id} />
                </li>
                ))
            }
          </ul>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {

  const id = ownProps.location.state.id;

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