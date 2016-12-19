import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../mutations/AddTokenMutation';
import React from 'react';
import Relay from 'react-relay';
//import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Tile from './Tile';

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
        />
      );
    });

    return newSpots;
  }
  render() {
    let headerText;
    if (this.props.relay.getPendingTransactions(this.props.game)) {
      headerText = '\u2026';
    // } else if (this._hasFoundTreasure()) {
    //   headerText = 'You win!';
    // } else if (this._isGameOver()) {
    //   headerText = 'Game over!';
    } else {
      headerText = 'Match the pokémon pairs!';
    }
    return (
      <div>
        <h1>{headerText}</h1>
        {this.generateTiles()}
        <p>Turns remaining: {this.props.game.turnsRemaining}</p>
      </div>
    );
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileVisible: 'hidden',
      tileChecked: false,
    };
  }

  _getHidingSpotStyle(hidingSpot) {
    let color;
    if (this.props.hasOptimisticUpdate) {
      //color = 'lightGrey';
    } /*else if (hidingSpot.hasBeenChecked) {
      if (hidingSpot.hasTreasure) {
        color = 'blue';
      } else {
        color = 'red';
      }
    }*/ else {
      color = 'black';
    }
    return {
      backgroundColor: color,
      cursor: this._isGameOver() ? null : 'pointer',
      display: 'inline-block',
      height: 120,
      marginRight: 5,
      width: 120,
    };
  }
  _handleHidingSpotClick(hidingSpot, e) {
    // if (this._isGameOver()) {
    //   return;
    // }
    e.target.classList.add('activeTile');

    const activeTile = document.getElementsByClassName('activeTile');
    if(activeTile.length > 1) {
      this.checkPair(activeTile);
    }

    Relay.Store.commitUpdate(
      new CheckHidingSpotForTreasureMutation({
        game: this.props.game,
        hidingSpot,
      }),
      {
        onSuccess: (result) => {
          console.log('Mutation worked!', result);
          this.setState({ tileVisible: 'visible' });
        },
        onFailure: (result) => {
          console.log('Mutation failed!', result);
        },
      }
    );
  }
  unrevealTile(tiles) {
    this.setState({ pairChecked: true });
    console.log('checking pair of tiles: ', tiles[0], tiles[1]);
    setTimeout(function() {
      // tiles[0].classList.remove('activeTile');
      // tiles[0].classList.remove('activeTile');

      tiles[0].children[0].style.visibility = 'hidden';
      tiles[1].children[0].style.visibility = 'hidden';
    },500);
  }

  checkPair(tiles) {
    console.log('checking pair of tiles: ', tiles[0].id, tiles[1].id);
    if(tiles[0].id == tiles[1].id) {
      pairsFound.push(tiles[0]);

      tiles[0].classList.add('correctTile');
      tiles[1].classList.add('correctTile');
      tiles[0].classList.remove('activeTile');
      tiles[0].classList.remove('activeTile');

      this.checkCompletion(pairsFound);
    }else{
      this.unrevealTile(tiles);
    }
  }
  checkCompletion(pairsFound) {
    const tiles = document.getElementsByClassName('pokebg');
    const lastFound = pairsFound.slice(-1)[0];
    //const tokenInventory = this.props.tokens;

    /*You should get a token correspondent to the last pokemon pair you found.
    A number of tokens can unlock the evolution of this pokemon, and some amount of tokens can unlock different and rarer pokemon.
    Also, as the game progresses the level of difficulty increases a bit (by adding more tiles and possibly other twists).*/

    if(pairsFound.length == tiles.length / 2) {
      const availablePokemon = this.props.availablePokemon;
      const prizePokemon = availablePokemon.filter(function(pokemon) {
        return pokemon.node.name === lastFound.alt;
      });
      //token = prizePokemon[0].node;
      //console.log('amount?', token.amount);
      //token.amount += 1;
      //token.amount = 0;
      /*tokenInventory.push(token);
      console.log('inventory after added: ', tokenInventory);*/

      console.log('token', token, this.props.user.id)

      // Relay.Store.commitUpdate(
      //   new AddTokenMutation({
      //     user: this.props.user,
      //     name: token.name,
      //     attribute: token.pokemonType,
      //     amount: token.amount
      //   }),
      //   {
      //     onSuccess: (result) => {
      //       console.log('Mutation worked!', result);
      //     },
      //     onFailure: (result) => {
      //       console.log('Mutation failed!', result);
      //     },
      //   }
      // );

      //this.setState({ gameCompleted: true, lastFound: token });
      //this.props.gameCompleted();
    }
  }

  _hasFoundTreasure() {
    return (
      this.props.hidingSpots.edges.some(edge => {
        return edge.node.hasTreasure
      })
    );
  }
  _isGameOver() {
    return !this.props.turnsRemaining || this._hasFoundTreasure();
  }

  render() {
    const tile = this.props.spot;

    return (
      <div
        key={tile.id}
        id={tile.pokemon.name}
        onClick={this._handleHidingSpotClick.bind(this, tile)}
        style={this._getHidingSpotStyle(tile)}
      >
        <Image
          className="pokeimg"
          style={{visibility: `${this.state.tileVisible}`}}
          src={tile.pokemon.image}
          alt={tile.pokemon.name}
          height="120"
        />
      </div>
    )
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
              ${AddTokenMutation.getFragment('token')},
            }
          }
        }
        ${AddTokenMutation.getFragment('game')},
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
      }
    `,
  },
});
