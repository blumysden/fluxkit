import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import $ from 'jquery'
import './Deck.css';
import archieml from 'archieml'
import marked from 'marked'
import deckContent from './deck-aml'
import UGC from './ugc'

const SLIDES = archieml.load(deckContent).slides

class Deck extends Component {

  constructor(props) {
    super(props)
    this.handleKeys = this.handleKeys.bind(this)
    this.state = {
      slide: null
    }
  }

  resize() {
    $(this.deck).height($(window).height())
  }

  advance(by=1) {
    let slide = this.state.slide + by
    if (slide < 1) {
      slide = 1
    } else if (slide > SLIDES.length) {
      slide = SLIDES.length
    }
    this.setState({ slide })
  }

  handleKeys(e) {
    if (e && e.code) {
      switch (e.code) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Space':
          this.advance()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          this.advance(-1)
          break;
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeys)
    this.resize()
    if (!this.state.slide) {
      this.setState({ slide: this.getSlideNumber() })
    }
  }

  componentDidUpdate() {
    this.resize()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys)
  }

  getSlideNumber() {
    let { slide } = this.props.match.params
    return slide ? parseInt(slide, 10) : null
  }

  render() {
    let slide = this.getSlideNumber()
    if (this.state.slide && this.state.slide !== slide) {
      return <Redirect push to={ `/deck/${this.state.slide}` } />
    }

    let data = SLIDES[slide - 1],
        classNames = ['slide']

    if (!data) {
      return null
    }


    let { hed, img, vid, caption, content, ugc, timer, notes } = data;

    ['hed', 'img', 'caption', 'content', 'ugc', 'vid'].forEach((attr) => {
      if (data[attr]) {
        // dumb:
        if (attr === 'vid') {
          attr = 'img'
        }
        classNames.push(`has-${attr}`)
      }
    })

    return (
      <div className="deck" ref={ (el) => this.deck = el }>
        <div className={ classNames.join(' ') }>
          { hed ?
            <header className="layer">
              <p className="special"><span>{hed}</span></p>
            </header> : null }
          { ugc ?
            <div className="ugc-content layer">
              <UGC sheetCol={ ugc } />
            </div> : null }
          { content ?
            <div className="main-content layer">
              <div className="content-inner" dangerouslySetInnerHTML={ { __html: marked(content) } } />
            </div>
            :null }
          { (img || vid) ?
            <figure className="main-fig layer">
              <div className="fig-inner">
                { img ?
                  <img src={ `/deck/images/${img}` } /> :
                  <iframe width="560" height="315" src={ `https://www.youtube.com/embed/${vid}` } frameBorder="0" allowFullScreen></iframe>
                }
                { caption ? <figcaption>{ caption }</figcaption> : null }
              </div>
            </figure>
            : null }
          { timer ?
            <div className="timer">
              <Timer minutes={ timer } />
            </div>
            : null }
          { notes && this.props.withNotes ?
            <div className="slide-notes">
              <div className="content-inner" dangerouslySetInnerHTML={ { __html: marked(notes) } } />
            </div>
            : null }
        </div>
      </div>
    );
  }
}

Deck.propTypes = {
  withNotes: PropTypes.bool
}

Deck.defaultProps = {
  withNotes: false
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      sec: 0,
      running: false
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    this.setState({ min: this.props.minutes })
  }

  toggle () {

  }

  render() {
    let { min, sec } = this.state
    if (sec < 10) {
      sec = `0${sec}`
    }
    return <div className="special" onClick={ this.toggle }><span>{min}:{sec}</span></div>
  }
}

export default Deck;
