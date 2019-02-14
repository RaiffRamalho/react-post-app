import React , { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'


class NewPost extends Component {
  
  state = {
    title:'',
    body:'',
    author:'',
    category:'',
  }

  handleChangeTitle = (e) => {
    const title = e.target.value
    this.setState(() => ({
      title
    }))
  }
  handleChangeBody = (e) => {
    const body = e.target.value
    this.setState(() => ({
      body
    }))
  }
  handleChangeCategory = (e) => {
    const category = e.target.value
    this.setState(() => ({
      category
    }))
  }
  handleChangeAuthor = (e) => {
    const author = e.target.value
    this.setState(() => ({
      author
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { title, author, body, category } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddPost(title, body, author, category));

    this.setState(() => ({
      title:'',
      body:'',
      author:'',
      category: '',
    }))
  }

  render(){
    /* todo: Redirect to / if submitted */
    const {title, body, author, category } = this.state;
    const isEnabled = title.length > 0 && body.length > 0 && author.length > 0 && category.length > 0;
    return (
      <div>

        <h3 className='center'>Compose new Post</h3>
        <form className='new-post' onSubmit={this.handleSubmit}>
          <input placeholder="Title"
            value={title}
            onChange={this.handleChangeTitle}
            className='input'  
          />
          <input placeholder="Category"
            value={category}
            onChange={this.handleChangeCategory}
            className='input'  
          />
          <textarea
            placeholder="What's happening?"
            value={body}
            onChange={this.handleChangeBody}
            className='textarea'
            maxLength={280}
          />
          {/* {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )} */}

          <input placeholder="Author"
            value={author}
            onChange={this.handleChangeAuthor}
            className='input'  
            />
          <button
            className='btn'
            type='submit'
            disabled={!isEnabled}>
              Submit
          </button>
        </form>

      </div>
    )
  }
}

export default connect()(NewPost)