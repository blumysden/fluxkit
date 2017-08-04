import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './Page';
import UGC from './ugc'
import './Activity.css';

class Activity extends Component {
  render() {
    let { title, slide, sheetCol } = this.props
    return (
      <Page title={ title } slide={ slide }>
        { sheetCol ?
            <UGC sheetCol={ sheetCol } listView={ true }/> :
            null
        }
      </Page>
    );
  }
}

Activity.propTypes = {
  sheetCol: PropTypes.number,
  title: PropTypes.string,
  slide: PropTypes.number
}

export default Activity;
