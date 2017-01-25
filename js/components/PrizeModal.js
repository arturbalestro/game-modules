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
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.addToken = this.addToken.bind(this);
    this.editToken = this.editToken.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.checkTokenAmount = this.checkTokenAmount.bind(this);
  }

  getAllPokemon() {
    const trainers = this.props.game.trainers.edges;
    const fullGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Red";
    });
    return fullGroup[0].node.pokemons.edges;
  }

  checkTokenAmount() {
    console.log('token: ', this.props.prize, this.props.game.tokens);
    const allPokemon = this.getAllPokemon();
    const amountReached = this.props.game.tokens.edges.filter(function(token) {
      return token.node.amount >= 2;
    });
    console.log('----', amountReached);
    amountReached.map(function(token) {
      console.log('Found a '+token.node.name+' token. His evolution can be unlocked.');
      const matchingPokemon = allPokemon.filter(function(pokemon) {
        return pokemon.node.entryNumber === token.node.entryNumber;
      });
      console.log('found entry number: ', matchingPokemon[0].node.entryNumber);
    });
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

    this.checkTokenAmount();
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

    this.checkTokenAmount();
  }

  closeModal() {
    this.setState({ showModal: false });

    const currentPrizeName = this.props.prize.name;
    const existingToken = this.props.game.tokens.edges.filter(function(token) {
      return token.node.name === currentPrizeName;
    });

    if(existingToken.length > 0) {
      this.editToken();
    }else{
      this.addToken();
    }

    TypedTransition.from(this).to(tokenList);
  }

  render() {
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
