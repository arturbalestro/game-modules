//React Plugins
import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

//Components
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';
import Tile from './Tile';
import TokenList from './TokenList';
import PrizeModal from './PrizeModal';
import GameOverModal from './GameOverModal';

//Mutations
import CheckTurnsMutation from '../mutations/CheckTurnsMutation';

//Variables
let turnsRemaining = 8;
let beginCounter = 0;

class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availablePokemon: {},
      turnsRemaining: 8,
      gameCompleted: false,
      showModal: false,
      gameOver: false,
      emptyBoard: false,
    };

    this.backToGame = this.backToGame.bind(this);
    this.getTiles = this.getTiles.bind(this);
    this.generateEmptyBoard = this.generateEmptyBoard.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
  }

  backToGame() {
    /*Useful when you decide to back out of the game without finding all the
    matches (specially due to not finding the Pokémon you need).*/
    pairsFound.splice(0, pairsFound.length);

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
        availablePokemon = this.getAvailablePokemon("Embar", "Electric", "");
      break;

      case '2':
        //viridian-forest
        availablePokemon = this.getAvailablePokemon("Embar", "Bug", "");
      break;

      case '3':
        //cinnabar-island
        availablePokemon = this.getAvailablePokemon("Embar", "Fire", "");
      break;

      case '4':
        //seafoam-islands
        availablePokemon = this.getAvailablePokemon("Embar", "Water", "Ice");
      break;

      case '5':
        //rock-tunnel
        availablePokemon = this.getAvailablePokemon("Embar", "Rock", "");
      break;

      case '6':
        //safari-zone
        availablePokemon = this.getAvailablePokemon("Embar", "Grass", "Normal");
      break;

      case '7':
        //mt-moon
        availablePokemon = this.getAvailablePokemon("Embar", "Fairy", "Flying");
      break;

      case '8':
        //underground-path
        availablePokemon = this.getAvailablePokemon("Embar", "Ground", "Poison");
      break;

      case '9':
        //lavender-tower
        availablePokemon = this.getAvailablePokemon("Embar", "Ghost", "Psychic");
      break;

      case '10':
        //victory-road
        availablePokemon = this.getAvailablePokemon("Embar", "Fighting", "Dragon");
      break;
    }

    return availablePokemon;
  }

  generateTiles(tiles) {
    //Step 1: get the pokemon available for the wild
    const tileList = this.getTiles();

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    const spotLength = this.props.game.hidingSpots.edges.length;
    for(let i = 0; i < spotLength / 2; i++) {
      const randomPokemon = this.randomNumber(tiles.length);
      const chosenPokemon = tiles[randomPokemon - 1];
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
      console.log('randomPokemon chosen is', chosenPokemon.name);

      // const addedPokemon = rearrangedTiles.filter((pokemon, index) => {
      //   const prevIndex = index - 1;
      //   if(index > 0) {
      //     console.log(rearrangedTiles[index].entryNumber, rearrangedTiles[prevIndex].entryNumber)
      //     return rearrangedTiles[index].entryNumber === rearrangedTiles[prevIndex].entryNumber
      //   }
      // });
      // console.log('addedPokemon', addedPokemon);
      // if(addedPokemon.length <= 0) {
        rearrangedTiles.push(chosenPokemon);
      // }else{
      //   j--;
      // }

      const index = tilePairs.indexOf(chosenPokemon);
      if(index > -1) {
        tilePairs.splice(index, 1);
      }
    }

    //beginCounter++;

    return rearrangedTiles;
  }
  renderTiles(tileList) {
    const rearrangedTiles = this.generateTiles(tileList);
    console.log('found the rearrangedTiles', rearrangedTiles);

    //Step 5: Add each sorted pokémon to its correspondent tile.
    const newSpots = [];
    this.props.game.hidingSpots.edges.map((spot, index) => {
      spot.node.pokemon = rearrangedTiles[index];
      newSpots.push(
        <Tile
          key={spot.node.id}
          spot={spot.node}
          turnsRemaining={turnsRemaining}
          hidingSpots={this.props.game.hidingSpots}
          game={this.props.game}
          tileList={tileList}
          restartGame={this.generateTiles}
        />
      );
    });

    if(!this.state.gameCompleted) {
      return newSpots;
    }
  }
  generateEmptyBoard() {
    const emptyTiles = [];
    this.props.game.hidingSpots.edges.map((spot, index) => {
      emptyTiles.push(
        <div key={spot.node.id} className="poketile"></div>
      );
    });

    return emptyTiles;
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    let headerText = 'Match the pokémon pairs!';
    let hasTokens = false;

    if(this.props.game.tokens.edges.length > 0) {
      hasTokens = true;
    } else {
      hasTokens = false;
    }

    const tiles = this.getTiles();

    return (
      <Row className="stage">
        <Col md={1} sm={1} lg={1} xs={2} className="no-padding text-center back-link">
          <Button onClick={this.backToGame}>
            <Glyphicon glyph="menu-left" />
          </Button>
        </Col>
        <Col md={10} sm={10} lg={10} xs={8} className="text-center no-padding">
          <h2 className="text-center">{headerText}</h2>
        </Col>
        <Col md={1} sm={1} lg={1} xs={2} className="text-center" />
        <Col md={12} className="text-center no-padding tile-board">
          {!this.state.emptyBoard && beginCounter == 0 &&
            this.renderTiles(tiles)
          }
          {this.state.emptyBoard &&
            this.generateEmptyBoard()
          }
        </Col>
        <Col md={12} className="text-center stage-bottom">
          <p>Turns remaining: <span className="turns-text">{/*this.checkTurns()*/ this.state.turnsRemaining}</span></p>
        </Col>
        {this.state.gameCompleted &&
          <PrizeModal
            game={this.props.game}
            tokens={this.state.tokens}
            prize={this.state.lastFound}
            showModal={true}
            restartGame={this.props.restartGame}
          />
        }
        {this.state.gameOver &&
          <GameOverModal
            game={this.props.game}
            showModal={true}
          />
        }
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
                    unlocked
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
        ${CheckTurnsMutation.getFragment('game')},
      }
    `,
  },
});
