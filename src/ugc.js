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
    let { sheetCol } = this.props,
        onComplete = (results) => {
          let responses = results.data.slice(1).map((row) => {
                return row[sheetCol]
              }),
              updater = window.setTimeout(this.updateContent, 3000)
          this.setState({ responses, updater })
        }

    $.ajax({
      url: 'https://crossorigin.me/https://docs.google.com/spreadsheets/d/1HjoRA-DvEPZ6Cqg6UuadT5FAF0bVPK_zC5GHdG2KG6w/pub?gid=1880008187&single=true&output=csv',
      dataType: 'text',
      type: 'GET',
      success: (results) => {
        onComplete(Papa.parse(results))
      }
    })
  }

  componentDidMount() {
    let { sheetCol } = this.props
    this.updateContent()

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
