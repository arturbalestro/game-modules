//React Plugins
import React from 'react';
import Relay from 'react-relay';
import FlipCard from 'react-flipcard';
import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';

//Mutations
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import AddPokemonMutation from '../mutations/AddPokemonMutation';
import CheckTurnsMutation from '../mutations/CheckTurnsMutation';

//Variables
const pairsFound = [];
let token = {};
let previousTile = {};

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnsRemaining: this.props.turnsRemaining,
      isFlipped: this.props.isFlipped,
      gameCompleted: false,
      gameOver: false,
      lastFound: {},
    };

    this.checkPair = this.checkPair.bind(this);
    this.checkTurns = this.checkTurns.bind(this);
    this.addToken = this.addToken.bind(this);
    this.editToken = this.editToken.bind(this);
    this.showBack = this.showBack.bind(this, this.props.spot);
    this.showFront = this.showFront.bind(this, this.props.spot);
    this.completeGame = this.props.completeGame.bind(this, this.state.gameCompleted);
    this.fetchPairs = this.props.fetchPairs.bind(this, pairsFound);
    this.gameOver = this.props.gameOver.bind(this);
  }

  getAllPokemon(trainerFilter) {
    const trainers = this.props.game.trainers.edges;
    const fullGroup = trainers.filter(function(trainer) {
      return trainer.node.name === trainerFilter;
    });
    return fullGroup[0].node.pokemons.edges;
  }

  componentDidUpdate() {

  }

  selectTile(currentTile, e) {
    this.setState({
      isFlipped: true
    });

    e.target.parentNode.classList.add('activeTile');
    console.log('selectTile.....', e.target.closest('.ReactFlipCard'));

    const activeTiles = document.querySelectorAll('.activeTile');
    console.log('found activeTiles', activeTiles);
    console.log('activeTiles length: ', activeTiles.length);

    if(activeTiles.length === 1) {
      previousTile = this;
      console.log('previousTile added: ', previousTile);
    }

    if(activeTiles.length > 1) {
      this.checkPair(activeTiles, currentTile, previousTile);
    }

    return activeTiles;
  }
  checkPair(tiles, currentTile, previousTile) {
    console.log('found the previous tile...', previousTile);
    console.log('checking pair...', tiles[0].id, tiles[1].id);
    if(tiles[0].id == tiles[1].id) {
      pairsFound.push(tiles[0].id);
      console.log('found a pair!!!', pairsFound);

      for(var i = 0; i < tiles.length; i++) {
        console.log('currentTile', currentTile.pokemon.pokemonType);

        tiles[i].classList.add('correctTile');
        tiles[i].classList.add('type-'+currentTile.pokemon.pokemonType);

        console.log('tiles', tiles[i]);
      }
      tiles[0].classList.remove('activeTile');
      tiles[1].classList.remove('activeTile');
      previousTile = {};

      this.checkCompletion(pairsFound, currentTile);
    }else{
      this.unrevealTile(tiles, previousTile);
    }

    this.checkTurns();
  }
  unrevealTile(tiles, previousTile) {
    const hiddenTiles = document.querySelectorAll(".poketile:not(.activeTile)");
    const incorrectTiles = document.querySelectorAll(".poketile:not(.correctTile)");

    for(var i = 0; i < hiddenTiles.length; i++) {
      hiddenTiles[i].style.pointerEvents = 'none';
    }

    const tile = this;

    setTimeout(function() {
      tiles[0].classList.remove('activeTile');
      tiles[1].classList.remove('activeTile');

      tile.setState({
        isFlipped: false
      });
      previousTile.setState({
        isFlipped: false
      });

      for(var i = 0; i < incorrectTiles.length; i++) {
        incorrectTiles[i].style.pointerEvents = 'auto';
      }
    },500);

    console.log('flipped?', this.refs.flipCard.props.flipped);
  }
  checkTurns() {
    let turnsText = document.getElementsByClassName('turns-text')[0].innerText;
    turnsText--;
    document.getElementsByClassName('turns-text')[0].innerText = turnsText;
    if(turnsText == 0) {
      pairsFound.splice(0, pairsFound.length);
      //this.setState({ gameOver: true });
      console.log('trying to apply game over here');
      this.props.gameOver();
    }
  }
  checkCompletion(pairsFound, currentTile) {
    const tiles = document.getElementsByClassName('poketile');
    const lastFound = pairsFound.slice(-1)[0];
    const tokenInventory = this.props.game.tokens;

    /*You should get a token correspondent to the last pokemon pair you found.
    A number of tokens can unlock the evolution of this pokemon, and some amount of tokens can unlock different and rarer pokemon.
    Also, as the game progresses the level of difficulty increases a bit (by adding more tiles and possibly other twists).*/

    if(pairsFound.length === tiles.length / 2) {
      const stage = this;
      const tileList = this.getAllPokemon("Embar");
      const prizePokemon = tileList.filter(function(pokemon) {
        return pokemon.node.entryNumber == lastFound;
      });
      token = prizePokemon[0].node;
      token.amount = 1;

      const currentPrizeName = token.name;
      const tokens = stage.props.game.tokens.edges;
      const existingToken = tokens.filter(function(token) {
        return token.node.name === currentPrizeName;
      });

      setTimeout(function() {
        if(existingToken.length > 0) {
          const editToken = stage.editToken(token);
        }else{
          const addToken = stage.addToken(token);
        }

        stage.setState({ emptyBoard: true });
      }, 50);

      setTimeout(function() {
        //stage.setState({ gameCompleted: true, lastFound: token });
      }, 200);

      stage.props.completeGame(stage, token);

      //Allows game to be played and completed once again.
      pairsFound.splice(0, pairsFound.length);
    }
  }

  addToken(token) {
    Relay.Store.commitUpdate(
      new AddTokenMutation({
        game: this.props.game,
        token: {
          id: token.id,
          name: token.name,
          entryNumber: token.entryNumber,
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
  }
  editToken(token) {
    Relay.Store.commitUpdate(
      new EditTokenMutation({
        game: this.props.game,
        token: {
          id: token.id,
          name: token.name,
          entryNumber: token.entryNumber,
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
  }

  showBack(tile, e) {
    console.log('showBack', tile, e);
    console.log('target.....', e.target);

    const activeTiles = this.selectTile(tile, e);
    console.log('#Tile render: activeTiles', activeTiles);
    if(activeTiles != undefined && activeTiles.length > 1) {
      const isMatch = this.checkPair(activeTiles, this.props.spot);
      console.log('is it a match?', isMatch);

      if(!isMatch) {
        this.setState({
          isFlipped: false
        });
      }
    }

    this.setState({
      isFlipped: true
    });
  }

  showFront(tile, e) {
    console.log('showFront', tile, e);
    this.setState({
      isFlipped: false
    });
  }

  render() {
    const tile = this.props.spot;
    const fetchPairs = this.props.fetchPairs(pairsFound);

    return (
      // <div
      //   className="poketile"
      //   key={tile.id}
      //   id={tile.pokemon.entryNumber}
      //   onClick={this.selectTile.bind(this, tile)}
      // >
      //   <Image
      //     className="pokeimg"
      //     src={tile.pokemon.image}
      //     alt={tile.pokemon.name}
      //     height="120"
      //   />
      //   <input type="hidden" ref="pairsFound" value={pairsFound} />
      // </div>
      <FlipCard
        disabled={true}
        flipped={this.state.isFlipped}
        ref="flipCard"
        // onClick={this.props.selectTile.bind(this, tile)}
      >
        {/* The first child is used as the front of the card */}
        <div
          className="poketile"
          key={tile.id}
          id={tile.pokemon.entryNumber}
          onClick={this.selectTile.bind(this, tile)}
        >
          <Image
            className="pokebg"
            id={tile.pokemon.name}
            src="img/tile-bg.jpg"
          />
        </div>
        {/* The second child is used as the back of the card */}
        <div
          className="poketile"
          key={tile.id}
          id={tile.pokemon.entryNumber}
          //onClick={this.selectTile.bind(this, tile)}
        >
          <Image
            className="pokeimg"
            id={tile.pokemon.name}
            src={tile.pokemon.image}
            alt={tile.pokemon.name}
            height="120"
          />
        </div>
      </FlipCard>
    )
  }
}

Tile.propTypes = {
  selectTile: React.PropTypes.func,
  getCurrentTile: React.PropTypes.func,
};
