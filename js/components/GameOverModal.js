import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Button, Image, Modal } from 'react-bootstrap';
import * as app from './App';
import * as tokenList from './TokenList';
import PageTransition from 'react-router-page-transition';

export default class GameOverModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });

    if(this.state.unlockablePokemon != null) {
      this.addPokemon();
    }

    TypedTransition.from(this).to(app);
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>You couldn't find all pairs in time!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button onClick={this.closeModal}>Try Again</Button>
        </Modal.Body>
        <Modal.Footer>
          <div className="transition-item list-page">
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

// export function path() {
//   return '/game';
// }

GameOverModal.contextTypes = TypedTransition.contextTypes();
