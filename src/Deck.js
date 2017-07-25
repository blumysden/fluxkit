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
      slide: 1
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
  }

  componentDidUpdate() {
    this.resize()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys)
  }

  render() {
    let { slide } = this.props.match.params
    console.log(slide, this.state.slide, slide);
    if (this.state.slide !== parseInt(slide)) {
      return <Redirect push to={ `/deck/${this.state.slide}` } />
    }

    let data = SLIDES[slide - 1],
        classNames = ['slide']

    if (!data) {
      return null
    }


    let { hed, img, caption, content } = data
    if (img) {
      classNames.push('has-img')
    }
    if (content) {
      classNames.push('has-content')
    }
    return (
      <div className="deck" ref={ (el) => this.deck = el }>
        <div className={ classNames.join(' ') }>
          { hed ?
            <header className="layer">
              <p className="special"><span>{hed}</span></p>
            </header> : null }
          { content ?
            <div className="main-content layer">
              <div dangerouslySetInnerHTML={ { __html: marked(content) } } />
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
