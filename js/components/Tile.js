import React from 'react';
import Relay from 'react-relay';
import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import PrizeModal from './PrizeModal';
import AddTokenMutation from '../mutations/AddTokenMutation';

const pairsFound = [];
let token = {};

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileVisible: 'hidden',
      gameCompleted: false,
      showModal: false,
      lastFound: {},
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

    const activeTiles = document.getElementsByClassName('activeTile');
    //const activeTiles = document.querySelectorAll('.activeTile > img');
    if(activeTiles.length > 1) {
      this.checkPair(activeTiles);
    }

    // Relay.Store.commitUpdate(
    //   new CheckHidingSpotForTreasureMutation({
    //     game: this.props.game,
    //     hidingSpot,
    //   }),
    //   {
    //     onSuccess: (result) => {
    //       console.log('Mutation worked!', result);
    //       this.setState({ tileVisible: 'visible' });
    //     },
    //     onFailure: (result) => {
    //       console.log('Mutation failed!', result);
    //     },
    //   }
    // );
  }
  unrevealTile(tiles) {
    const hiddenTiles = document.querySelectorAll(".poketile:not(.activeTile)");
    const incorrectTiles = document.querySelectorAll(".poketile:not(.correctTile)");

    for(var i = 0; i < hiddenTiles.length; i++) {
      hiddenTiles[i].style.pointerEvents = 'none';
    }

    setTimeout(function() {
      tiles[0].classList.remove('activeTile');
      tiles[0].classList.remove('activeTile');

      for(var i = 0; i < incorrectTiles.length; i++) {
        incorrectTiles[i].style.pointerEvents = 'auto';
      }
    },500);
  }

  checkPair(tiles) {
    if(tiles[0].id == tiles[1].id) {
      pairsFound.push(tiles[0]);

      for(var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add('correctTile');
        tiles[i].classList.add('type-'+this.props.spot.pokemon.pokemonType);
      }
      tiles[0].classList.remove('activeTile');
      tiles[0].classList.remove('activeTile');

      this.checkCompletion(pairsFound);
    }else{
      this.unrevealTile(tiles);
    }
  }
  checkCompletion(pairsFound) {
    const tiles = document.getElementsByClassName('poketile');
    const lastFound = pairsFound.slice(-1)[0];
    const tokenInventory = this.props.game.tokens;

    /*You should get a token correspondent to the last pokemon pair you found.
    A number of tokens can unlock the evolution of this pokemon, and some amount of tokens can unlock different and rarer pokemon.
    Also, as the game progresses the level of difficulty increases a bit (by adding more tiles and possibly other twists).*/

    if(pairsFound.length == tiles.length / 2) {
      const availablePokemon = this.props.availablePokemon;
      const prizePokemon = availablePokemon.filter(function(pokemon) {
        return pokemon.node.name === lastFound.children[0].alt;
      });
      console.log('prize pokemon is: ', prizePokemon);
      token = prizePokemon[0].node;
      //console.log('amount?', token.amount);
      //token.amount += 1;
      token.amount = 0;
      //tokenInventory.push(token);
      console.log('inventory after added: ', tokenInventory);

      console.log('token', token)

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
      Relay.Store.commitUpdate(
        new AddTokenMutation({
          game: this.props.game,
          token: {
            id: token.id,
            name: token.name,
            attribute: token.pokemonType,
            amount: token.amount,
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

      this.setState({ gameCompleted: true, lastFound: token });
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
        className="poketile"
        key={tile.id}
        id={tile.pokemon.name}
        onClick={this._handleHidingSpotClick.bind(this, tile)}
      >
        <Image
          className="pokeimg"
          src={tile.pokemon.image}
          alt={tile.pokemon.name}
          height="120"
        />
        {this.state.gameCompleted &&
          <PrizeModal prize={this.state.lastFound} showModal={true} />
        }
      </div>
    )
  }
}