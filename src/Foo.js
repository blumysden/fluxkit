import React, { Component } from 'react';
import UGC from './ugc'
import './Foo.css';

class Foo extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div className="activity">
        <p>Here is some stuff we want to show just about the foo activity.</p>
        <UGC sheetCol="4" />
      </div>
    );
  }
}

export default Foo;
