import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';

import { handleAddComment } from '../actions/comments';


import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class PostPage extends Component {

  state = {
    open: false,
    author: '',
    body: '',
    parentId: this.props.post.id
  };

  handleClickOpen = (e) => {
    e.preventDefault()
    this.setState({ open: true });
  };

  handleClose = (e) => {
    e.preventDefault()
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ open: false });
    
    const { author, body, parentId } = this.state;

    const { dispatch } = this.props;

    dispatch(handleAddComment(author, body,parentId));

    this.setState(() => ({
      body:'',
      author:'',
    }))

  };

  handleChangeAuthor = (e) => {
    const author = e.target.value
    this.setState(() => ({
      author
    }))
  };
  handleChangeBody = (e) => {
    const body = e.target.value
    this.setState(() => ({
      body
    }))
  };

  render() {

    const {author, body} = this.state;
    const isEnabled = author.length > 0 && body.length > 0;

    return (
      <div>
        <h3>Post Details</h3>
        <Post id={this.props.post.id} />

        <ul className='list-container' style={{listStyle: 'none'}}>
            <Button variant="contained" onClick={this.handleClickOpen}>
              New Comment
            </Button><br/>

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add a new Comment</DialogTitle>
              <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="author"
                    label="Author"
                    type="text"
                    value={this.state.author}
                    fullWidth
                    onChange={this.handleChangeAuthor}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="body"
                    label="Comment here"
                    type="text"
                    value={this.state.body}
                    fullWidth
                    onChange={this.handleChangeBody}
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={this.handleSubmit} color="primary" disabled={!isEnabled}>
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
            <hr></hr>
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