import React, { Component } from 'react';
import Papa from 'papaparse'
import $ from 'jquery'

class UGC extends Component {

  constructor(props) {
    super(props)
    this.updateContent = this.updateContent.bind(this)
    this.state = {
      responses: [],
      updater: null
    }
  }

  updateContent() {
    let { sheetCol } = this.props
    window.clearTimeout(this.state.updater)
    $.ajax({
      url: 'https://us-central1-blumysden-171515.cloudfunctions.net/fluxUgcProxy',
      dataType: 'json',
      type: 'GET',
      success: (results) => {
        let responses = results.slice(1).map((row) => {
              return row[sheetCol]
            }),
            updater = window.setTimeout(this.updateContent, 10000)

        this.setState({ responses, updater })
      }
    })
  }

  componentDidMount() {
    let { sheetCol } = this.props
    this.updateContent()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sheetCol !== this.props.sheetCol) {
      this.updateContent();
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.updater)
  }

  renderResponse(text, i) {
    let rotation = Math.floor(Math.random() * 4),
        indent = Math.floor(Math.random() * 50)

    if (Math.round(Math.random()) === 0) {
      rotation = rotation * -1
    }
    if (Math.round(Math.random()) === 0) {
      indent = indent * -1
    }
    return <p className="special" key={ `p${i}`} style={ { transform: `rotate(${rotation}deg)`, marginLeft: `${indent}px` } }><span>{text}</span></p>
  }

  render() {
    return (
      <div>
        { this.state.responses.map(this.renderResponse)}
      </div>
    );
  }
}

export default UGC;
