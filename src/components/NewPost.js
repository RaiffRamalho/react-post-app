import React , { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPost, handleEditPost } from '../actions/posts';
import { Redirect } from 'react-router-dom';


class NewPost extends Component {

  constructor(props){
    super(props);
    const edit = this.props.location.state.edit;
    this.state = {
      id: !edit ? '' : this.props.location.state.post.id,
      isEdit : edit,
      title: !edit ? '' : this.props.location.state.post.title,
      body: !edit ? '' : this.props.location.state.post.body,
      author: !edit ? '' : this.props.location.state.post.author,
      category: !edit ? '' : this.props.location.state.post.category,
      toHome: false,
      categoryValid: edit,
    } 

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

  handleEdit = (e) => {
    e.preventDefault()

    const { id, title, body } = this.state;
    const { dispatch } = this.props;

    dispatch(handleEditPost(id, title, body));

    this.setState(() => ({
      id: '',
      title:'',
      body:'',
      author:'',
      category: '',
      toHome: true,
      categoryValid: false,
    }))
  }


  render(){    

    const {title, body, author, category, toHome, categoryValid, isEdit} = this.state;    
    
    if (toHome === true) {
      return <Redirect to='/' />
    }
    
    const isEnabled = title.length > 0 && body.length > 0 && author.length > 0 && category.length > 0 && categoryValid;
    
    return (
      <div>
        {!isEdit && (<h3 className='center'>Compose a new Post</h3>)}
        {isEdit && (<h3 className='center'>Edit the Post</h3>)}
        
        <form className='new-post' onSubmit={(this.state.isEdit && this.handleEdit) || this.handleSubmit}>
          <input placeholder="Title"
            value={title}
            onChange={this.handleChangeTitle}
            className='input'  
          />

          {!isEdit && (
              <input placeholder="Category"
                value={category}
                onChange={                     
                  this.handleChangeCategory }
                className='input'  
              /> 
          )}
          
          {!categoryValid && (
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
          
          {!isEdit &&(
            <input placeholder="Author"
            value={author}
            onChange={this.handleChangeAuthor}
            className='input'  
            />
          )}
          
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