import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UGC from './ugc'
import './Activity.css';

class Activity extends Component {
  render() {
    let { title, sheetCol } = this.props
    return (
      <div className="activity">
        <h2 className="mainTitle">snerdFluxKit</h2>
        { title ?
            <h3 className="activityTitle">{ title }</h3> :
            null
        }
        { sheetCol ?
            <UGC sheetCol={ sheetCol } listView={ true }/> :
            null
        }
      </div>
    );
  }
}

Activity.propTypes = {
  sheetCol: PropTypes.number,
  title: PropTypes.string
}

export default Activity;
