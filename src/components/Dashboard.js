import  React,  { Component } from 'react';
import { connect } from 'react-redux';

import Category from './Category';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import { NavLink } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props){
    super(props);
    const pathname  = this.props.location.pathname;
    this.state = {
      value: pathname === '/react' ? 1: pathname === '/redux'? 2: pathname === '/udacity' ? 3 : 0,
    };
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  handleSelect = (e, category) => {
    e.preventDefault()
    this.props.history.push(`/${category}`)
  }

  render() {
    const { value } = this.state;
    const pathname  = this.props.location.pathname;

    return (
      <div className="dash">
      
        <div className="tabs">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              {
                this.props.categories.map((category) => (
                  <Tab key={category.name} label={category.name} onClick={(e) => this.handleSelect(e, category.name)}/>
                  ))
                }
            </Tabs>
          </AppBar>
        </div>
        <div className="button-new-post">
        
          <NavLink to={{ pathname: '/new', state: { edit: false, post: {}} }}>
            <Button  variant="contained" >
              New Post
            </Button >
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