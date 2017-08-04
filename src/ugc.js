import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'
//
//TODO add a list prop

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class UGC extends Component {

  constructor(props) {
    super(props)
    this.updateContent = this.updateContent.bind(this)
    this.runFlipper = this.runFlipper.bind(this)
    this.flipTimer = null
    this.state = {
      responses: [],
      displayed: [],
      updater: null,
      index: 0,
      updatedAt: null,
      initialOrder: []
    }
  }

  updateContent() {
    let { sheetCol } = this.props
    window.clearTimeout(this.state.updater)
    $.ajax({
      url: 'https://us-central1-blumysden-171515.cloudfunctions.net/fluxUgcReader',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: (results) => {
        let hasChanged = false
        let responses = results.slice(1).reduce((memo, row, i) => {
              let response = row[sheetCol]
              if (response) {
                memo.push(row[sheetCol])
              }
              return memo
            }, []),
            updater = window.setTimeout(this.updateContent, 10000)
        hasChanged = responses.find((r, i) => r !== this.state.responses[i])
        if (hasChanged) {
          this.setState({ responses, updater, updatedAt: Date.parse(new Date()) })
        }
        // if (!this.state.initialOrder.length && responses.length) {
        //   this.setState({ initialOrder: shuffle([ ...Array(responses.length).keys() ])})
        // }
      }
    })
  }


  // TODO randomize flips
  runFlipper() {
    if (this.props.listView) {
      return false
    }
    window.clearTimeout(this.flipTimer)
    let { responses } = this.state,
        displayed = this.state.displayed.slice(),
        index = this.state.index

    if (displayed.length === 0 && responses.length > 0) {
      displayed = [ ...Array(responses.length).keys() ]
    }
    index = displayed.splice(Math.floor(Math.random() * displayed.length), 1)[0]
    this.setState({ index, displayed })
    this.flipTimer = window.setTimeout(() => { this.runFlipper() }, 12000)
  }

  componentDidMount() {
    this.updateContent()
    this.runFlipper()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sheetCol !== this.props.sheetCol) {
      this.updateContent()
    }
    if (prevState.updatedAt !== this.state.updatedAt) {
      this.runFlipper()
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.updater)
  }

  renderResponse(text, i) {
    if (!text) {
      return null
    }
    let rotation = Math.floor(Math.random() * 4),
        indent = Math.floor(Math.random() * 50)

    if (Math.round(Math.random()) === 0) {
      rotation = rotation * -1
    }
    if (Math.round(Math.random()) === 0) {
      indent = indent * -1
    }
    return <div key={ `p${i}`}>
      <p className="special" style={ { transform: `rotate(${rotation}deg)`, marginLeft: `${indent}px` } }><span>{text}</span></p>
      { this.props.listView ? <div className="divider"/> : null }
    </div>
  }

  render() {
    let { responses, index, initialOrder } = this.state
    return (
      <div className="ugc" onClick={ this.runFlipper }>
        { !this.props.listView ?
            this.renderResponse(responses[index], index) :
            responses.map((r, i) => this.renderResponse(r, i))
        }
      </div>
    );
  }
}

UGC.propTypes = {
  sheetCol: PropTypes.number,
  listView: PropTypes.bool,
  controls: PropTypes.bool
}

UGC.defaultProps = {
  listView: false,
  controls: false
}

export default UGC;
