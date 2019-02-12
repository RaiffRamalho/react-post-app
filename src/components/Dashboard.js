import  React,  { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post'

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';


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
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { value } = this.state;
    return (
      <div className="tabs">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab value='0' label="Home" />
            {
              this.props.categories.map((category, index) => (
                <Tab label={category.name} />
                )
              )
            }
          </Tabs>
        </AppBar>
          {/* {
            this.props.categories.map((category, index) => (
              value === index && <TabContainer>{category.name}</TabContainer>
              )
            )
          } */}
          <Button variant="contained" className="button-new-post">
            New Post
          </Button>
          <ul>
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