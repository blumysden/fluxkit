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
        { examplePs.map((p) => {
          let rotation = Math.floor(Math.random() * 4),
              indent = Math.floor(Math.random() * 50)

          if (Math.round(Math.random()) == 0) {
            rotation = rotation * -1
          }
          if (Math.round(Math.random()) == 0) {
            indent = indent * -1
          }
          return <p className="special" style={ { transform: `rotate(${rotation}deg)`, marginLeft: `${indent}px` } }><span>{p}</span></p>
        }) }
        <UGC sheetCol="4" />
      </div>
    );
  }
}

export default Foo;
