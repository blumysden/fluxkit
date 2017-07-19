import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Foo from './Foo';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Foo}/>
      </Router>
    );
  }
}

export default App;
