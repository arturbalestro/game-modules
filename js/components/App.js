import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../mutations/AddTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
//import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Tile from './Tile';
import TokenList from './TokenList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.generateTiles = this.generateTiles.bind(this);
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }
  generateTiles() {
    //Step 1: get the pokemon available for the wild
    const availablePokemon = this.props.game.pokemons.edges;

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    const spotLength = this.props.game.hidingSpots.edges.length;
    for(let i = 0; i < spotLength / 2; i++) {
      const randomPokemon = this.randomNumber(availablePokemon.length);
      const chosenPokemon = availablePokemon[randomPokemon - 1];
      tileGroup.push(chosenPokemon.node);
    }

    //Step 3: Duplicate the group of selected pokemon, to be their pairs, and join them all together.
    const tileClone = tileGroup.slice(0);
    const tilePairs = tileGroup.concat(tileClone);

    //Step 4: Rearranging all the pairs to add them on the board randomly. The already selected objects are removed from the array.
    const rearrangedTiles = [];
    for(let j = tilePairs.length; j > 0; j--) {
      const randomPokemon = this.randomNumber(tilePairs.length);
      const chosenPokemon = tilePairs[randomPokemon - 1];
      rearrangedTiles.push(chosenPokemon);

      const index = tilePairs.indexOf(chosenPokemon);
      if(index > -1) {
        tilePairs.splice(index, 1);
      }
    }

    //Step 5: Add each sorted pokémon to its correspondent tile.
    const newSpots = [];
    this.props.game.hidingSpots.edges.map((spot, index) => {
      spot.node.pokemon = rearrangedTiles[index];
      newSpots.push(
        <Tile
          key={spot.node.id}
          spot={spot.node}
          hasOptimisticUpdate={this.props.relay.hasOptimisticUpdate(spot.node)}
          turnsRemaining={this.props.game.turnsRemaining}
          hidingSpots={this.props.game.hidingSpots}
          game={this.props.game}
          availablePokemon={availablePokemon}
          restartGame={this.generateTiles}
        />
      );
    });

    return newSpots;
  }
  render() {
    console.log('showing tokens graphql', this.props.game.tokens);
    let headerText;
    let hasTokens = false;
    if (this.props.relay.getPendingTransactions(this.props.game)) {
      headerText = '\u2026';
    // } else if (this._hasFoundTreasure()) {
    //   headerText = 'You win!';
    // } else if (this._isGameOver()) {
    //   headerText = 'Game over!';
    } else {
      headerText = 'Match the pokémon pairs!';
    }

    console.log('this.props.game.tokens', this.props.game.tokens);
    if(this.props.game.tokens.edges.length > 0) {
      hasTokens = true;
    } else {
      hasTokens = false;
    }

    return (
      <div>
        <h1>{headerText}</h1>
        {this.generateTiles()}
        <p>Turns remaining: {this.props.game.turnsRemaining}</p>
        {hasTokens &&
          <TokenList tokens={this.props.game.tokens} pokemons={this.props.game.pokemons} />
        }
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        turnsRemaining,
        hidingSpots(first: 9) {
          edges {
            node {
              hasBeenChecked,
              hasTreasure,
              id,
              ${CheckHidingSpotForTreasureMutation.getFragment('hidingSpot')},
            }
          }
        },
        pokemons(first: 10000) {
          edges {
            node {
              id
              entryNumber
              name
              pokemonType
              image
              species
            }
          }
        }
        tokens(first: 10000) {
          edges {
            node {
              id
              name
              attribute
              amount
            }
          }
        }
        ${AddTokenMutation.getFragment('game')},
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
      }
    `,
  },
});
