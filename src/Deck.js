import React, { Component } from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery'
import './Deck.css';
import archieml from 'archieml'
import marked from 'marked'
import deckContent from './deck-aml'

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


    let { hed, img, caption, content } = data;

    ['hed', 'img', 'caption', 'content'].forEach((attr) => {
      if (data[attr]) {
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
          { content ?
            <div className="main-content layer">
              <div className="content-inner" dangerouslySetInnerHTML={ { __html: marked(content) } } />
            </div>
            :null }
          { img ?
            <figure className="main-fig layer">
              <div className="fig-inner">
                <img src={ `/deck/images/${img}` } />
                { caption ? <figcaption>{ caption }</figcaption> : null }
              </div>
            </figure>
            : null }
        </div>
      </div>
    );
  }
}

export default Deck;
