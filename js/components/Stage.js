import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import * as app from './App';
import Tile from './Tile';
import TokenList from './TokenList';

class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availablePokemon: {},
    };

    this.backToGame = this.backToGame.bind(this);
    this.getTiles = this.getTiles.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
  }

  backToGame() {
    TypedTransition.from(this).to(app);
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
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

  getTiles() {
    const stageNumber = this.props.location.query.stage;
    let availablePokemon = [];
    switch(stageNumber) {
      case '1':
        //power-plant
        availablePokemon = this.getAvailablePokemon("Wild", "Electric", "");
      break;

      case '2':
        //viridian-forest
        availablePokemon = this.getAvailablePokemon("Wild", "Bug", "");
      break;

      case '3':
        //cinnabar-island
        availablePokemon = this.getAvailablePokemon("Wild", "Fire", "");
      break;

      case '4':
        //seafoam-islands
        availablePokemon = this.getAvailablePokemon("Wild", "Water", "Ice");
      break;

      case '5':
        //rock-tunnel
        availablePokemon = this.getAvailablePokemon("Wild", "Rock", "");
      break;

      case '6':
        //safari-zone
        availablePokemon = this.getAvailablePokemon("Wild", "Grass", "Normal");
      break;

      case '7':
        //mt-moon
        availablePokemon = this.getAvailablePokemon("Wild", "Fairy", "Flying");
      break;

      case '8':
        //underground-path
        availablePokemon = this.getAvailablePokemon("Wild", "Ground", "Poison");
      break;

      case '9':
        //lavender-tower
        availablePokemon = this.getAvailablePokemon("Wild", "Ghost", "Psychic");
      break;

      case '10':
        //victory-road
        availablePokemon = this.getAvailablePokemon("Wild", "Fighting", "Dragon");
      break;
    }

    return availablePokemon;
  }

  generateTiles() {
    //Step 1: get the pokemon available for the wild
    const tileList = this.getTiles();

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    const spotLength = this.props.game.hidingSpots.edges.length;
    for(let i = 0; i < spotLength / 2; i++) {
      const randomPokemon = this.randomNumber(tileList.length);
      const chosenPokemon = tileList[randomPokemon - 1];
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
          availablePokemon={tileList}
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

    if(this.props.game.tokens.edges.length > 0) {
      hasTokens = true;
    } else {
      hasTokens = false;
    }

    return (
      <Row className="stage">
        <Col md={1} className="no-padding">
          <ul>
            <li>
              <Button onClick={this.backToGame}>
                <Glyphicon glyph="menu-left" />
              </Button>
            </li>
          </ul>
        </Col>
        <Col md={11} className="text-center no-padding">
          <h2 className="text-center">{headerText}</h2>
        </Col>
        <Col md={12} className="text-center no-padding">
          {this.generateTiles()}
        </Col>
        <Col md={12}>
          <p>Turns remaining: {this.props.game.turnsRemaining}</p>
        </Col>
        {/* {hasTokens &&
          <TokenList tokens={this.props.game.tokens} pokemons={availablePokemon} />
        } */}
      </Row>
    );
  }
}

export function path() {
  return '/stage';
}

Stage.propTypes = {
  getAvailablePokemon: React.PropTypes.func,
};
Stage.contextTypes = TypedTransition.contextTypes();

export default Relay.createContainer(Stage, {
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
                    canEvolve
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