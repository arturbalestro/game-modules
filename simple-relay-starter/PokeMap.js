/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, ButtonToolbar, ButtonGroup, Button, Grid, Row, Col, Image, Modal } from 'react-bootstrap';

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
    console.log("We have ",availablePokemon.length," Pokémon available");

    //Step 2: Select a group of random pokemon to appear in the tiles
    const tileGroup = [];
    for(let i = 0; i < 21; i++) {
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

      tiles.push(<Tile chosenPokemon={chosenPokemon} />);

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
    };

    this.revealTile = this.revealTile.bind(this);
    this.unrevealTile = this.unrevealTile.bind(this);
  }

  revealTile(e) {
    console.log('e.target', e.target);
    e.target.setAttribute('class', 'active');

    this.setState({ tileVisible: true });
  }

  unrevealTile() {
    this.setState({ tileVisible: false });
  }

  render() {
    // We get the conference edges passed in from the top-level container
    // The edges have data like name and id on them
    const grassImage = '/img/grass.jpg';
    var chosenPokemon = this.props.chosenPokemon;
    console.log('A wild ', chosenPokemon.name, ' appeared!');
    return (
      <div className="poketile">
        <Image onClick={this.revealTile} id="pokebg" src={grassImage} height="120" />
        {this.state.tileVisible &&
          <Image id="pokeimg" src={chosenPokemon.image} height="120" />
        }
      </div>
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
