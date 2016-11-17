/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, ButtonToolbar, ButtonGroup, Button, Grid, Row, Col, Image, Modal } from 'react-bootstrap';

class PokeMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      chosenPokemon: {},
    };
  }

  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  openModal() {
    const trainers = this.props.user.trainers.edges;

    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Wild";
    });
    const availablePokemon = wildGroup[0].node.pokemons.edges;
    //console.log("We have ",availablePokemon.length," Pokémon available", availablePokemon);
    const randomPokemon = this.randomNumber(availablePokemon.length);
    var chosenPokemon = availablePokemon[randomPokemon - 1];
  	console.log('-----', chosenPokemon);

    this.setState({ chosenPokemon: chosenPokemon, showModal: true });
  }

  closeModal(e) {
    console.log("click value: ", e.target.value);
    this.setState({ showModal: false });
  }

  render() {
    const grassImage = 'https://cdn3.f-cdn.com/contestentries/44321/7430869/526e2123b37c4_thumb900.jpg';
    const chosenPokemon = this.state.chosenPokemon.node;
    //const pokemonExists = this.state.chosenPokemon.node.entryNumber === edge.node.entryNumber;
    return (
      <div className="container">
        <Grid>
          <Row>
            <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
                <Button onClick={this.openModal.bind(this)}><img src={grassImage} height="120" /></Button>
              </ButtonGroup>
            </ButtonToolbar>
            {chosenPokemon &&
              <Modal
                show={this.state.showModal}
                onHide={this.closeModal.bind(this)}
                className="text-center"
              >
                <Modal.Header closeButton>
                  <Modal.Title><b>#{chosenPokemon.entryNumber} {chosenPokemon.name}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img src={chosenPokemon.image} height="120" />
                  <br /><br />
                  <Label bsStyle="success">{chosenPokemon.pokemonType}</Label>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeModal.bind(this)} value={chosenPokemon.entryNumber}>Catch It!</Button>
                </Modal.Footer>
              </Modal>
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
