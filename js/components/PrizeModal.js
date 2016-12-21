import React from 'react';
import Relay from 'react-relay';
import { Button, Image, Modal } from 'react-bootstrap';

export default class PrizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
    window.location.reload();
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
