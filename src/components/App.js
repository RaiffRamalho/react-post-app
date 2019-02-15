import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Nav from './Nav'

import './App.css';
import { connect } from 'react-redux';
import { handleInitialCategoryData, handleInitialPostData } from '../actions/shared';

import Dashboard from './Dashboard';
import NewPost from './NewPost';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.props.dispatch(handleInitialCategoryData())
    this.props.dispatch(handleInitialPostData())
  }

  render() {
    return (
      <Router>
        {/* <Nav /> */}
        <div className="App App-header">
          <Route path='/' exact component={Dashboard} />
          <Route path='/new' component={NewPost} />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
