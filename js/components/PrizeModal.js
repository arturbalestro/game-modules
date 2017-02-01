import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Button, Image, Modal } from 'react-bootstrap';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import * as app from './App';
import * as tokenList from './TokenList';
import PageTransition from 'react-router-page-transition';

export default class PrizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
      pokemonUnlocked: this.props.pokemonUnlocked,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.addToken = this.addToken.bind(this);
    this.editToken = this.editToken.bind(this);
  }

  componentWillMount() {
    if(!this.state.pokemonUnlocked) {
      const currentPrizeName = this.props.prize.name;
      const tokens = this.props.game.tokens.edges;
      const existingToken = tokens.filter(function(token) {
        return token.node.name === currentPrizeName;
      });

      if(existingToken.length > 0) {
        this.editToken();
      }else{
        this.addToken();
      }
    }
  }

  addToken() {
    Relay.Store.commitUpdate(
      new AddTokenMutation({
        game: this.props.game,
        token: {
          id: this.props.prize.id,
          name: this.props.prize.name,
          entryNumber: this.props.prize.entryNumber,
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

  editToken() {
    Relay.Store.commitUpdate(
      new EditTokenMutation({
        game: this.props.game,
        token: {
          id: this.props.prize.id,
          name: this.props.prize.name,
          entryNumber: this.props.prize.entryNumber,
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

    if(!this.state.pokemonUnlocked) {
      TypedTransition.from(this).to(tokenList);
    }
  }

  renderToken() {
    return(
      <div>
        <h4>You found all the pairs!</h4>
        <p>Received 1 {this.props.prize.name} Token.</p>
        <div className={"token type-"+this.props.prize.pokemonType}>
          <Image src={this.props.prize.image} />
        </div>
      </div>
    );
  }

  renderPokemon() {
    return(
      <div>
        <Image src={this.props.prize.node.image} />
        <p>{`You have unlocked `+this.props.prize.node.name+` into your game!`}</p>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {!this.state.pokemonUnlocked &&
            this.renderToken()
          }
          {this.state.pokemonUnlocked &&
            this.renderPokemon()
          }
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

PrizeModal.contextTypes = TypedTransition.contextTypes();
