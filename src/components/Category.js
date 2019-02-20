import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';


class Category extends Component {

  state = {
    orderByDate: true,
    dateColor: 'gold',
    orberByVote : false,
    voteColor: 'white'
  }
  
  handleClickOrderDate = ()=> {
    this.setState({
      orderByDate: true,
      dateColor: 'gold',
      orderByVote: false,
      voteColor: 'white'
    })
  }
  handleClickOrderVote = ()=> {
    this.setState({
      orderByDate: false,
      dateColor: 'white',
      orderByVote: true,
      voteColor: 'gold'
    })
  }
  render() {

    let newArr = this.props.categoryPosts.map((post) => (post));
    if(this.state.orderByVote){
      newArr.sort(
        (a,b) => b.voteScore - a.voteScore);  
    }else if (this.state.orderByDate){
      newArr.sort(
        (a,b) => b.timestamp - a.timestamp);
    }

    return (
      <div>
        <div>
          Order by:{'  '}
            <span style={{color: this.state.dateColor}} className='order-span-date' onClick={this.handleClickOrderDate}>
              Date
            </span>
            {'  '} or {'  '}
            <span style={{color: this.state.voteColor}} className='order-span-vote' onClick={this.handleClickOrderVote}>
              Vote
            </span>
        </div>

        <ul className='list-container' style={{listStyle: 'none'}}>
          {
            newArr.map((post) => (
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
