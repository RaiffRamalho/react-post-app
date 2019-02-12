import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { handleInitialCategoryData, handleInitialPostData } from '../actions/shared';

import Dashboard from './Dashboard';

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
      <div className="App App-header">
        <Dashboard />
      </div>
    );
  }
}

export default connect()(App);
