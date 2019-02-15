import React , { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPost } from '../actions/posts';
import { Redirect } from 'react-router-dom';



class NewPost extends Component {
  
  state = {
    title:'',
    body:'',
    author:'',
    category:'',
    toHome: false,
    categoryValid: false,
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
    const category = e.target.value;
    const contains = this.props.categories.indexOf(category) > -1;

    this.setState(() => ({
      category,
      categoryValid: contains
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
      toHome: true,
    }))
  }

  render(){
    
    const {title, body, author, category, toHome, categoryValid } = this.state;
    if (toHome === true) {
      return <Redirect to='/' />
    }
    const isEnabled = title.length > 0 && body.length > 0 && author.length > 0 && category.length > 0 && categoryValid;
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
            onChange={                     
              this.handleChangeCategory }
            className='input'  
          /> {!categoryValid && (
            <div className='category-validation'>
              Category Invalid.
            </div>
          )}
          <textarea
            placeholder="What's happening?"
            value={body}
            onChange={this.handleChangeBody}
            className='textarea'
            maxLength={280}
          />

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

function mapStateToProps ({categories}){
  return {
    categories: Object.values(categories).map((category)=> (category.name)),
  }
}

export default connect(mapStateToProps)(NewPost)