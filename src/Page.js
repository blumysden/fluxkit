import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Page.css';

class Page extends Component {
  render() {
    let { title, children } = this.props
    return (
      <div className="page">
        <h2 className="main-title">new sNerdFluxKit (2017)</h2>
        { title ?
            <h3 className="page-title">{ title }</h3> :
            null
        }
        <div className="main-page-content">
          { children }
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string
}

export default Page;
