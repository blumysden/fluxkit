import React, { Component } from 'react';
import PropTypes from 'prop-types'
import marked from 'marked'

class Markdown extends Component {

  render() {
    let { content, className } = this.props
    return <div className={ className } dangerouslySetInnerHTML={ { __html: marked(content) } } />
  }
}

Markdown.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string
}

export default Markdown;
