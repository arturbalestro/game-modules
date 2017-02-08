import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Button, Image, Modal } from 'react-bootstrap';
import AddPokemonMutation from '../mutations/AddPokemonMutation';
import * as app from './App';
import * as tokenList from './TokenList';
import PageTransition from 'react-router-page-transition';

export default class PrizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
      pokemonUnlocked: false,
      unlockablePokemon: null,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  getAllPokemon(trainerFilter) {
    const trainers = this.props.game.trainers.edges;
    const fullGroup = trainers.filter(function(trainer) {
      return trainer.node.name === trainerFilter;
    });
    return fullGroup[0].node.pokemons.edges;
  }
  getAvailablePokemon(group, type, type2) {
    const trainers = this.props.game.trainers.edges;
    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === group;
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges.filter(function(pokemon) {
      if(type2 !== "") {
        return pokemon.node.pokemonType === type
            || pokemon.node.pokemonType === type2;
      }else{
        return pokemon.node.pokemonType === type;
      }
    });
    return availablePokemon;
  }

  checkTokenAmount(tokens, prize) {
    const allPokemon = this.getAllPokemon("Red");
    const canUnlock = tokens.filter(function(token, index) {
      return token.node.entryNumber === prize.entryNumber
          && token.node.amount >= 2;
    });
    if(canUnlock.length > 0) {
      const matchingPokemon = allPokemon.filter(function(pokemon) {
        return pokemon.node.entryNumber === canUnlock[0].node.entryNumber;
      });

      if(matchingPokemon.length > 0) {
        const unlockablePokemon = allPokemon.filter(function(pokemon) {
          if(matchingPokemon[0].node.canEvolve === true) {
            return pokemon.node.entryNumber === matchingPokemon[0].node.entryNumber + 1;
          }
        });

        return unlockablePokemon;
      }
    }
  }

  unlockZapdos(tokens, prize) {
    const availablePokemon = this.getAvailablePokemon("Red", "Electric", "");
    console.log('availablePokemon', availablePokemon);
    const canUnlock = tokens.filter(function(token, index) {
      return token.node.amount >= 2;
    });
    console.log('canUnlock', canUnlock);
    console.log('lengths: ', canUnlock.length, (availablePokemon.length - 2));
    if(canUnlock.length === (availablePokemon.length - 2)) {
      const unlockablePokemon = availablePokemon.filter(function(pokemon) {
        return pokemon.node.name === "Zapdos";
      });
      console.log('unlocking Zapdos...', unlockablePokemon);

      return unlockablePokemon;
    }
  }

  componentDidMount() {
    const tokens = this.props.game.tokens.edges;
    console.log('found tokens...', tokens);

    if(tokens.length > 0) {
      console.log('name: ', this.props.prize.name);
      let unlockablePokemon = this.checkTokenAmount(tokens, this.props.prize);

      if(this.props.prize.pokemonType === "Electric") {
        const unlockZapdos = this.unlockZapdos(tokens, this.props.prize);
        console.log('zapdos unlocked?', unlockZapdos);
        if(unlockZapdos != undefined) {
          unlockablePokemon = unlockZapdos;
        }
      }

      if(unlockablePokemon != undefined && unlockablePokemon.length > 0) {
        if(!unlockablePokemon[0].node.unlocked) {
          this.setState({ unlockablePokemon: unlockablePokemon[0], pokemonUnlocked: true });
        }
      }
    }
  }

  addPokemon() {
    if(!this.state.unlockablePokemon.node.unlocked) {
      Relay.Store.commitUpdate(
        new AddPokemonMutation({
          game: this.props.game,
          trainer: {
            id: this.props.game.trainers.edges[0].node.id,
          },
          pokemon: {
            entryNumber: this.state.unlockablePokemon.node.entryNumber,
            unlocked: true,
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
  }

  closeModal() {
    this.setState({ showModal: false });

    if(this.state.unlockablePokemon != null) {
      this.addPokemon();
    }

    TypedTransition.from(this).to(tokenList);
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
    const unlocked = this.state.unlockablePokemon.node;
    return(
      <div>
        <Image src={unlocked.image} />
        <p>{`You have unlocked `+unlocked.name+` into your game!`}</p>
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
          {this.renderToken()}
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
