import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';
import CommentDialog from './CommentDialog'

import { handleAddComment, handleEditComment } from '../actions/comments';


import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class PostPage extends Component {

  state = {
    open: false,
    commentId:'',
    authorComment: '',
    bodyComment: '',
    parentId: this.props.post.id,
    isCommentEdit: false
  };

  handleEdit = (id, bodyComment) => {
    this.setState(() => ({
      commentId: id,
      bodyComment: bodyComment,
      isCommentEdit: true,
      open: true
    }))
  }

  handleClickOpen = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState(() => ({
      bodyComment:'',
      authorComment:'',
      isCommentEdit: false,
      open: false
    }))
  };

  handleSubmitComment = (e) => {
    e.preventDefault();
    this.setState({ open: false });
    
    const { authorComment, bodyComment, parentId, isCommentEdit, commentId } = this.state;
    const { dispatch } = this.props;

    if(isCommentEdit){
      dispatch(handleEditComment(commentId, bodyComment));
    }else{
      dispatch(handleAddComment(authorComment, bodyComment,parentId));
    }

    this.setState(() => ({
      commentId: '',
      bodyComment: '',
      authorComment: '',
      isCommentEdit: false
    }))

  };

  handleChangeAuthor = (e) => {
    const authorComment = e.target.value
    this.setState(() => ({
      authorComment
    }))
  };
  handleChangeBody = (e) => {
    const bodyComment = e.target.value
    this.setState(() => ({
      bodyComment
    }))
  };

  render() {

    const {authorComment, bodyComment, isCommentEdit} = this.state;
    const isEnabled = (authorComment.length > 0 && bodyComment.length > 0) || (isCommentEdit && bodyComment.length > 0);

    return (
      <div>
        <h3>Post Details</h3>
        <Post id={this.props.post.id} />

        <ul className='list-container' style={{listStyle: 'none'}}>

            {/* COMMENT CONTAINER */}

            {/* <CommentDialog /> */}
            <Button variant="contained" onClick={this.handleClickOpen}>
              New Comment
            </Button><br/>

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add a Comment</DialogTitle>
              <DialogContent>
                  {!isCommentEdit && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="authorComment"
                      label="Author"
                      type="text"
                      value={this.state.authorComment}
                      fullWidth
                      onChange={this.handleChangeAuthor}
                    />
                  )}
                  <TextField
                    margin="dense"
                    id="bodyComment"
                    label="Comment here"
                    type="text"
                    value={this.state.bodyComment}
                    fullWidth
                    onChange={this.handleChangeBody}
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={this.handleSubmitComment} color="primary" disabled={!isEnabled}>
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
            {/* COMMENT CONTAINER */}
            <hr></hr>
            Comment List
            {
              this.props.postComments.map((comment) => (
                <li key={comment.id}>
                  <Comment id={comment.id} handleEdit={this.handleEdit} />
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