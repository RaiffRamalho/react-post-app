import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


class Post extends Component {

  render(){
    const { post } = this.props;
    const {
      title, body, author
    } = post
    return (
      <div>
          Title: {title}<br />
          Body: {body}<br />
          Author: {author}<br />
      </div>
    )
  }

}

function mapStateToProps ({posts}, { id }) {
  const post = Object.values(posts).filter((post) => ( post.id ===id))[0]

  return {
    post: post,
  }
}
 
export default connect(mapStateToProps)(Post)