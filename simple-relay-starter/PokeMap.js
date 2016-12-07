/* eslint-env es6 */
var React = require('react')
var ReactDOM = require('react-dom')
var Relay = require('react-relay')
import { Label, ButtonToolbar, ButtonGroup, Button, Grid, Row, Col, Image, Modal } from 'react-bootstrap';

const pairsFound = [];
const tokenInventory = [];

class PokeMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenPokemon: {},
    };
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  generateTiles() {
    //Step 1: get the pokemon available for the wild
    const tiles = [];
    const trainers = this.props.user.trainers.edges;
    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Wild";
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges;
    //console.log("We have ",availablePokemon.length," Pokémon available");

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    for(let i = 0; i < 7; i++) {
      const randomPokemon = this.randomNumber(availablePokemon.length);
      const chosenPokemon = availablePokemon[randomPokemon - 1];
      tileGroup.push(chosenPokemon.node);
    }

    //Step 3: Duplicate the group of selected pokemon, to be their pairs, and join them all together.
    const tileClone = tileGroup.slice(0);
    const tilePairs = tileGroup.concat(tileClone);

    //Step 5: Render all the tiles on the board randomly. The already drawn tiles are removed from the array.
    for(let j = tilePairs.length; j > 0; j--) {
      const randomPokemon = this.randomNumber(tilePairs.length);
      const chosenPokemon = tilePairs[randomPokemon - 1];

      tiles.push(<Tile chosenPokemon={chosenPokemon} availablePokemon={availablePokemon} />);

      const index = tilePairs.indexOf(chosenPokemon);
      if(index > -1) {
        tilePairs.splice(index, 1);
      }
    }

    return tiles;
  }

  render() {
    return (
      <div className="container text-center">
          <Row>
            <Col className="pokeboard" md={12} lg={10}>
              {this.generateTiles()}
            </Col>
          </Row>
      </div>
    )
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileVisible: false,
      gameCompleted: false,
      showModal: false,
      lastFound: {},
    };

    this.revealTile = this.revealTile.bind(this);
    this.unrevealTile = this.unrevealTile.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  revealTile(e) {
    this.setState({ tileVisible: true });
    e.target.classList.add('activeTile');

    const activeTile = document.getElementsByClassName('activeTile');
    console.log(activeTile.length);

    if(activeTile.length > 1) {
      this.checkPair(activeTile);
    }
  }

  unrevealTile(tiles) {
    setTimeout(function() {
      tiles[0].classList.remove('activeTile');
      tiles[0].classList.remove('activeTile');
    },500);
  }

  checkPair(tiles) {
    console.log(tiles[0].alt, tiles[1].alt);

    if(tiles[0].alt == tiles[1].alt) {
      console.log('You got a pair!');
      pairsFound.push(tiles[0]);
      console.log('pairsFound for: ', pairsFound);

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
    console.log('last pair found?', pairsFound.slice(-1)[0]);
    const lastFound = pairsFound.slice(-1)[0];
    /*You should get a token correspondent to the last pokemon pair you found.
    A number of tokens can unlock the evolution of this pokemon, and some amount of tokens can unlock different and rarer pokemon.
    Also, as the game progresses the level of difficulty increases a bit (by adding more tiles and possibly other twists).*/

    if(pairsFound.length == tiles.length / 2) {
      console.log('congrats, you completed the game! Modal with the prize should be opened soon!');
      this.setState({ gameCompleted: true, lastFound: lastFound });
    }
  }

  render() {
    const grassImage = '/img/grass.jpg';
    const chosenPokemon = this.props.chosenPokemon;
    //console.log('A wild ', chosenPokemon.name, ' appeared!');
    console.log('states: ', this.state);
    return (
      <div className="poketile">
        <Image
          onClick={this.revealTile}
          className="pokebg"
          alt={chosenPokemon.name}
          src={grassImage}
          height="120"
        />
        {/* {this.state.tileVisible && */}
          <Image className="pokeimg" src={chosenPokemon.image} height="120" />
        {/* } */}
        {this.state.gameCompleted &&
          <PrizeModal prize={this.state.lastFound} showModal={true} />
        }
      </div>
    )
  }
}

class PrizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
    };

    this.closeModal = this.closeModal.bind(this);
    //this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    console.log('here is your prize ', this.props.prize);
    //Need to pass the availablePokemon as props to this component.
    /*const trainers = this.props.user.trainers.edges;
    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Wild";
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges;
    const prizePokemon = availablePokemon.filter(function(prize) {
      return pokemon.node.name === this.props.prize.alt;
    });
    console.log('the token you will get is...', prizePokemon);*/

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Congratulations, you found all the pairs!</h4>
          <p>Received 1 {this.props.prize.alt} Token.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

// We need to export a Relay container that wraps around
// the top-level PokeMap component
exports.Container = Relay.createContainer(PokeMap, {
  // We initially want to get the first trainer's pokémons
  initialVariables: {
    // trainerToShow: 5,
  },
  fragments: {
    // Results from this query will be placed on this.props for access in
    // our component
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        trainers(first: 10000) {
          edges {
            node {
              id,
              name,
              pokemons(first: 10000) {
                edges {
                  node {
                    id,
                    entryNumber,
                    name,
                    image,
                    pokemonType,
                  },
                },
              },
            },
          },
        },
      }
    `,
  },
})

// The queries to be used by the root container
exports.queries = {
  name: 'PokemonQueries',
  params: {},
  queries: {
    // user in this case matches the fragment in the container above
    user: () => Relay.QL`query { user }`,
  },
}
