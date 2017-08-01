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
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(e) {
    // TODO: I think we need to isolate this somehow, because
    // right now clicking on a link or timer or whatever advances the slide
    // if (e) {
    //   this.advance()
    // }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeys)
    document.addEventListener('click', this.handleClick)
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
    document.removeEventListener('click', this.handleClick)
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
                  <iframe src={ `https://www.youtube.com/embed/${vid}` } frameBorder="0" allowFullScreen="true"></iframe>
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
      remaining: parseInt(props.minutes) * 60,
      running: false
    }
    this.interval = null
    this.toggle = this.toggle.bind(this)
  }

  componentDidUpdate() {
    if (this.state.remaining === 0) {
      this.pause();
    }
  }

  pause() {
    window.clearInterval(this.interval)
    this.setState({ counting: false })
  }

  countdown() {
    this.pause()
    this.setState({ counting: true })
    this.interval = window.setInterval(() => {
      this.setState({ remaining: this.state.remaining - 1 })
    }, 1000)
  }

  toggle (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.state.counting) {
      this.pause()
    } else {
      this.countdown()
    }
  }

  render() {
    let { remaining, counting } = this.state,
        min = Math.floor(remaining / 60),
        sec = remaining % 60,
        classNames = ['special', 'timer']

    if (sec < 10) {
      sec = `0${sec}`
    }

    if (!counting) {
      classNames.push('paused')
    }
    return <div className={ classNames.join(' ') } onClick={ this.toggle }><span>{min}:{sec}</span></div>
  }
}

export default Deck;
