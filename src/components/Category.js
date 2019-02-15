import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'



class Category extends Component {
  render() {
    return (
      <div>
          <ul className='list-container' style={{listStyle: 'none'}}>
            {
              this.props.categoryPosts.map((post) => (
                <li key={post.id}>
                  <Post id={post.id} />
                </li>
                ))
            }
          </ul>
        </div>
    )
  }
}

function mapStateToProps ({posts}, {name}){

  return {
    categoryPosts: name ==='home' ? Object.values(posts) : Object.values(posts).filter((post) => (
      post.category === name
    ))
  }
}

export default connect(mapStateToProps)(Category)
