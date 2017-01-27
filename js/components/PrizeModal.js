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
      unlockedPokemon: false,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.addToken = this.addToken.bind(this);
    this.editToken = this.editToken.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.checkTokenAmount = this.checkTokenAmount.bind(this);
    this.checkUnlockables = this.checkUnlockables.bind(this);
  }

  getAllPokemon(trainerFilter) {
    const trainers = this.props.game.trainers.edges;
    const fullGroup = trainers.filter(function(trainer) {
      return trainer.node.name === trainerFilter;
    });
    return fullGroup[0].node.pokemons.edges;
  }

  checkTokenAmount() {
    const amountReached = [];
    const allPokemon = this.getAllPokemon("Red");
    const canUnlock = this.props.game.tokens.edges.filter(function(token) {
      return token.node.amount >= 2;
    });
    amountReached.push(canUnlock);
    console.log('----', amountReached);
    const unlockablePokemon = amountReached[0].map(function(token) {
      console.log('Found a '+token.node.name+' token. His evolution can be unlocked.');
      const matchingPokemon = allPokemon.filter(function(pokemon) {
        return pokemon.node.entryNumber === token.node.entryNumber;
      });
      console.log('found matchingPokemon', matchingPokemon);
      return matchingPokemon[0].node;
    });

    console.log(unlockablePokemon);
    return unlockablePokemon;
  }

  checkUnlockables() {
    const matchingPokemon = this.checkTokenAmount();
    console.log('matchingPokemon', matchingPokemon);
    // const unlockedPokemon = allPokemon.filter(function(pokemon) {
    //   return pokemon.node.entryNumber === token.node.entryNumber + 1;
    // });
    // console.log('Can it evolve?', matchingPokemon[0].node.canEvolve);
    // console.log(matchingPokemon[0].node.name+' can be unlocked!');
    // if(matchingPokemon[0].node.canEvolve) {
    //   return matchingPokemon[0].node;
    // }

    this.setState({ unlockedPokemon: true });
  }

  componentWillMount() {
    const currentPrizeName = this.props.prize.name;
    const existingToken = this.props.game.tokens.edges.filter(function(token) {
      return token.node.name === currentPrizeName;
    });

    if(existingToken.length > 0) {
      this.editToken();
    }else{
      this.addToken();
    }
  }

  componentDidMount() {
    this.checkUnlockables();
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
          {this.state.unlockedPokemon &&
            <div>
              <p>Unlocked!</p>
              {/* <p>You have unlocked ${this.checkUnlockables()} into your game!</p> */}
            </div>
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
