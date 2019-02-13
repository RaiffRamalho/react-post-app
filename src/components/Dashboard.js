import  React,  { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post'


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import {  } from 'react-icons/fa';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class Dashboard extends Component {

  state = {
    value: 0,
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="dash">
        <div className="tabs">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Home" />
              {
                this.props.categories.map((category, index) => (
                  <Tab key={category.name} label={category.name} />
                  )
                  )
                }
            </Tabs>
          </AppBar>
        </div>
        {/* {
          this.props.categories.map((category, index) => (
            value === index && <TabContainer>{category.name}</TabContainer>
            )
          )
        } */}
        <div className="button-new-post">
          <button variant="contained">
            New Post
          </button>
        </div>

        <div>
          <ul className='list-container' style={{listStyle: 'none'}}>
            {
              this.props.posts.map((post) => (
                <li key={post.id}>
                  <Post id={post.id} />
                </li>
                )
                )
            }
          </ul>
        </div>
      </div>
    )
  }

}

function mapStateToProps ({categories, posts}){
  return {
    categories: Object.values(categories),
    posts: Object.values(posts),
  }
}

export default connect(mapStateToProps)(Dashboard)