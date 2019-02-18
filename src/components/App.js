import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import { connect } from 'react-redux';
import { handleInitialCategoryData, handleInitialPostData } from '../actions/shared';

import Dashboard from './Dashboard';
import NewPost from './NewPost';
import PostPage from './PostPage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.props.dispatch(handleInitialCategoryData());
    this.props.dispatch(handleInitialPostData());
  }

  render() {
    return (
      <Router>
        {/* <Nav /> */}
        <div className="App App-header">
          <Route path='/' exact component={Dashboard} />
          <Route path='/new' component={NewPost} />
          <Route path='/postPage' component={PostPage} />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
