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

    this.revealPokemon = this.revealPokemon.bind(this);
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  revealPokemon() {
    const trainers = this.props.user.trainers.edges;

    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Wild";
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges;
    //console.log("We have ",availablePokemon.length," Pokémon available", availablePokemon);
    const randomPokemon = this.randomNumber(availablePokemon.length);
    var chosenPokemon = availablePokemon[randomPokemon - 1];
  	console.log('-----', chosenPokemon);

    this.setState({ chosenPokemon: chosenPokemon });

    return (
      <Image src={chosenPokemon.image} height="120" />
    )
  }

  render() {
    const grassImage = '/img/grass.jpg';
    const chosenPokemon = this.state.chosenPokemon.node;
    //const pokemonExists = this.state.chosenPokemon.node.entryNumber === edge.node.entryNumber;
    return (
      <div className="container">
        <Grid>
          <Row>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            <a onClick={this.revealPokemon}><Image src={grassImage} height="120" /></a>
            {chosenPokemon &&
              <div className="panel panel-default pokepanel" key={chosenPokemon.entryNumber}>
                <div className="panel-heading">
                  <h5><b>#{chosenPokemon.entryNumber} {chosenPokemon.name}</b></h5>
                </div>
                <div className="panel-body text-center">
                  <img src={chosenPokemon.image} height="120" />
                  <br /><br />
                  <Label bsStyle="success" className={"type-"+chosenPokemon.pokemonType}>{chosenPokemon.pokemonType}</Label>
                </div>
                <Button value={chosenPokemon.entryNumber}>Catch It!</Button>
              </div>
            }
          </Row>
        </Grid>
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
