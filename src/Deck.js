import React, { Component } from 'react';
import $ from 'jquery'
import './Deck.css';
import archieml from 'archieml'
import marked from 'marked'
import deckContent from './deck-aml'

const SLIDES = archieml.load(deckContent).slides

class Deck extends Component {

  resize() {
    $(this.deck).height($(window).height())
  }

  componentDidMount() {
    this.resize()
  }

  componentDidUpdate() {
    this.resize()
  }

  render() {
    let { slide = 1 } = this.props.match.params,
        data = SLIDES[slide - 1],
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
