import  React,  { Component } from 'react';
import { connect } from 'react-redux';

import Category from './Category'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { NavLink } from 'react-router-dom'


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
      <div className="dash">
      
        <div className="tabs">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              {
                this.props.categories.map((category) => (
                  <Tab key={category.name} label={category.name} />
                  ))
                }
            </Tabs>
          </AppBar>
        </div>
        <div className="button-new-post">
          <NavLink to='/new' activeClassName='active'>
            <button variant="contained" onClick={ (e) => {}} >
              New Post
            </button>
          </NavLink>
          
        </div>
        {
          this.props.categories.map((category, index) => (
            value === index && <Category key={category.name} name={category.name}></Category>
            )
          )
        }
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