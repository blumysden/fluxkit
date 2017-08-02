import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import marked from 'marked'

import './App.css';
import Page from './Page';
import Activity from './Activity';
import Deck from './Deck';
import Markdown from './Markdown';
import DeckNotes from './DeckNotes';
import { SCOTT, BRITT } from './manifestos'

class sNerdFluxKit {
  constructor(year) {
    this.year = year
  }

  pages() {
    console.log('list of pages')
  }
}

class App extends Component {

  componentDidMount() {
    window.sNerdFluxKit = sNerdFluxKit
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Activity}/>
          <Route exact path="/manifestos" render={ () => <Activity title="Manifestos" sheetCol={1} />}/>
          <Route exact path="/manifestos/scott" render={ () => <Page title="Manifesto for Second-Person Journalism"><Markdown className="manifesto-scott" content={ SCOTT }/></Page> }/>
          <Route exact path="/manifestos/britt" render={ () => <Page title="Manifesto for Second-Person Journalism"><Markdown className="manifesto-britt" content={ BRITT }/></Page> }/>
          <Route exact path="/deck" component={Deck}/>
          <Route exact path="/deck/notes" component={DeckNotes}/>
          <Route exact path="/deck/:slide" component={Deck}/>
        </div>
      </Router>
    );
  }
}

export default App;
