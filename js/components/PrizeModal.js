import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Button, Image, Modal } from 'react-bootstrap';
import AddTokenMutation from '../mutations/AddTokenMutation';
import App from './App';

export default class PrizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.addToken = this.addToken.bind(this);
  }

  addToken() {
    Relay.Store.commitUpdate(
      new AddTokenMutation({
        game: this.props.game,
        token: {
          id: this.props.prize.id,
          name: this.props.prize.name,
          attribute: this.props.prize.pokemonType,
          amount: this.props.prize.amount,
        },
      }),
      {
        onSuccess: (result) => {
          console.log('Mutation worked!', result);
        },
        onFailure: (result) => {
          console.log('Mutation failed!', result);
        },
      }
    );
  }

  closeModal() {
    this.setState({ showModal: false });
    this.addToken();

    //TypedTransition.from(this).to(App, this.props.game.id);
    setTimeout(function() {
      window.location.reload();
    }, 800);
  }

  render() {
    console.log('here is your prize ', this.props.prize);

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4>You found all the pairs!</h4>
          <p>Received 1 {this.props.prize.name} Token.</p>
          <div className={"token type-"+this.props.prize.pokemonType}>
            <Image src={this.props.prize.image} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

// export function path() {
//   return '/';
// }
//
// PrizeModal.contextTypes = TypedTransition.contextTypes();
