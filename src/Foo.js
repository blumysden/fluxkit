import React, { Component } from 'react';
import UGC from './ugc'
import './Foo.css';

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
