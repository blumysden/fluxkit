import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FluxCube from './Cube.js';
import './Page.css';

class Page extends Component {
  render() {
    let { title, slide, children, className, isHome } = this.props,
        titleEl = (slide) ? <a href={ `/deck/${slide} `}>{ title }</a> : <span>{title}</span>,
        classNames = ['page'].concat([ className ]).join(' ')

    return (
      <div className={ classNames }>
        <h2 className="main-title">new sNerdFluxKit (2017)</h2>
        { title ?
            <h3 className="page-title">{ titleEl }</h3> :
            null
        }
        <div className="main-page-content">
          { children }
        </div>
        { (isHome) ? <FluxCube w={400} h={300}/> : <FluxCube w={100} h={66}/> }
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  slide: PropTypes.number,
  isHome: PropTypes.bool
}

export default Page;
