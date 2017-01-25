import CheckHidingSpotForTreasureMutation from '../../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../../mutations/AddTokenMutation';
import EditTokenMutation from '../../mutations/EditTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../../scripts/TypedTransition';
//import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Tile from '../Tile';
import TokenList from '../TokenList';

class PowerPlant extends React.Component {
  constructor(props) {
    super(props);

    this.generateTiles = this.generateTiles.bind(this);
    this.getAvailablePokemon = this.getAvailablePokemon.bind(this);
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  getAvailablePokemon() {
    const trainers = this.props.game.trainers.edges;
    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Wild";
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges.filter(function(pokemon) {
      return pokemon.node.pokemonType === "Electric";
    });
    return availablePokemon;
  }

  generateTiles() {
    //Step 1: get the pokemon available for the wild
    const availablePokemon = this.getAvailablePokemon();

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    const spotLength = this.props.game.hidingSpots.edges.length;
    for(let i = 0; i < spotLength / 2; i++) {
      const randomPokemon = this.randomNumber(availablePokemon.length);
      const chosenPokemon = availablePokemon[randomPokemon - 1];

      const wasChosen = tileGroup.filter(function(pokemon) {
        return pokemon.name === chosenPokemon.node.name;
      });

      //This verification prevents duplicate pairs of pokémons.
      if(wasChosen.length <= 0) {
        tileGroup.push(chosenPokemon.node);
      }else{
        //Decreasing the counter so the tiles can still be added to the list.
        i--;
      }
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

    const availablePokemon = this.getAvailablePokemon();

    if(this.props.game.tokens.edges.length > 0) {
      hasTokens = true;
    } else {
      hasTokens = false;
    }

    return (
      <div className="power-plant">
        <h1>Power Plant</h1>
        <h2>{headerText}</h2>
        {this.generateTiles()}
        <p>Turns remaining: {this.props.game.turnsRemaining}</p>
        {/* {hasTokens &&
          <TokenList tokens={this.props.game.tokens} pokemons={availablePokemon} />
        } */}
      </div>
    );
  }
}

export function path() {
  return '/power-plant';
}

export default Relay.createContainer(PowerPlant, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        id,
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
        trainers(first: 10000) {
          edges {
            node {
              id
              name
              specialty
              weakness
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
            }
          }
        }
        tokens(first: 10000) {
          edges {
            node {
              id
              name
              entryNumber
              attribute
              amount
            }
          }
        }
        ${AddTokenMutation.getFragment('game')},
        ${EditTokenMutation.getFragment('game')},
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
      }
    `,
  },
});
