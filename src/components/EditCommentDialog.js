import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleEditComment } from '../actions/comments';

import { FaEdit } from 'react-icons/fa';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class EditCommentDialog extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      commentId: this.props.commentId ? this.props.commentId : '',
      bodyComment: this.props.bodyComment ? this.props.bodyComment : ''
    };
  }

  handleClickOpen = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ open: false })
  };


  handleSubmitComment = (e) => {
    e.preventDefault();
    
    const { bodyComment, commentId } = this.state;
    const { dispatch } = this.props;

    dispatch(handleEditComment(commentId, bodyComment));

    this.setState(() => ({
      commentId: '',
      bodyComment: '',
      open: false
    }))

  };

  handleChangeBody = (e) => {
    const bodyComment = e.target.value
    this.setState(() => ({
      bodyComment
    }))
  };

  render() {
    const {bodyComment} = this.state;
    const isEnabled = bodyComment.length > 0;

    return (
      <div> 
            {' '}
            <FaEdit onClick={this.handleClickOpen}/>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
              <DialogContent>
                  <TextField
                    margin="dense"
                    id="bodyComment"
                    label="Edit here"
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
            {' '}
      </div>
    )
  }
}


export default connect()(EditCommentDialog)
