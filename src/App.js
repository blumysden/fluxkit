import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Foo from './Foo';
import Deck from './Deck';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Foo}/>
          <Route exact path="/activities/:id" component={Foo}/>
          <Route exact path="/deck" component={Deck}/>
          <Route exact path="/deck/:slide" component={Deck}/>
        </div>
      </Router>
    );
  }
}

export default App;
