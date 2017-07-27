import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './DeckNotes.css';
import archieml from 'archieml'
import marked from 'marked'
import deckContent from './deck-aml'

const SLIDES = archieml.load(deckContent).slides

class DeckNotes extends Component {

  render() {

    return (
      <div className="deck-notes">
        { SLIDES.map((slide, i) => {
          let { notes, hed, img, caption, content } = slide,
              slideNo = i + 1
          return <div className="slide-notes" key={ `slide-note-${ slideNo }`}>
            <header>
              <Link to={ `/deck/${slideNo}`}>Slide { slideNo }</Link>
            </header>
            { notes ?
              <div className="note-content" dangerouslySetInnerHTML={ { __html: marked(notes) } } />
              : <div className="note-content"><p>No notes.</p></div> }
          </div>
        }) }

      </div>
    );
  }
}

export default DeckNotes;
