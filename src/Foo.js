import React, { Component } from 'react';
import UGC from './ugc'
import './Foo.css';

const examplePs = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
]

class Foo extends Component {
  render() {
    return (
      <div className="activity">
        <h2 className="mainTitle">snerdFluxKit</h2>
        <UGC sheetCol={2} />
      </div>
    );
  }
}

export default Foo;
