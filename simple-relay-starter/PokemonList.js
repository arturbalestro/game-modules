/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, Button, Row, Col } from 'react-bootstrap';
//import RenameTrainerMutation from './RenameTrainerMutation';

// PokemonList is our top-level component
class PokemonList extends React.Component {
  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  handleClick(name) {
    console.log('-----------handleclick', this, name);
    /*Relay.Store.commitUpdate(
      new RenameTrainerMutation({trainer: this.props.trainer, name})
    );*/
  }

  render() {
    console.log("-----", this.randomNumber(12));
    return (
      <div className="container">
        <Button onClick={this.handleClick.bind(this, 'Embar')}>Change the name of the trainer</Button>
        <br /><br />
        {this.props.user.trainers.edges.map(trainer =>
          <Row key={trainer.node.id}>
            <Col md={12}>
              <h2>Pokémons of {trainer.node.name}</h2>
              {trainer.node.pokemons.edges.map(pokemon =>
                <Pokemon edge={pokemon} key={pokemon.node.id} />
              )}
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

class Pokemon extends React.Component {

  handleClick(e) {
    console.log("click value: ", e);
  }

  render() {
    // We get the conference edges passed in from the top-level container
    // The edges have data like name and id on them
    var edge = this.props.edge;
    return (
      <div className="col-sm-3 col-lg-3">
        <div className="panel panel-default pokepanel" key={edge.node.id}>
          <div className="panel-heading">
            <h5><b>{edge.node.name}</b></h5>
          </div>
          <div className="panel-body text-center">
            <img src={edge.node.image} height="120" />
            <br /><br />
            <Label bsStyle="success" className={"type-"+edge.node.pokemonType}>{edge.node.pokemonType}</Label>
          </div>
          <Button onClick={this.handleClick.bind(this)}>Choose Pokémon</Button>
        </div>
      </div>
    )
  }
}

// We need to export a Relay container that wraps around
// the top-level PokemonList component
exports.Container = Relay.createContainer(PokemonList, {
  // We initially want to get the first trainer's pokémons
  initialVariables: {
    trainerToShow: 6,
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
        # trainerGroups(trainerToShow: $trainerToShow) {
        #   edges {
        #     node {
        #       id,
        #       name,
        #       pokeGroup(first: 10000) {
        #         edges {
        #           node {
        #             id,
        #             entryNumber,
        #             name,
        #             image,
        #             pokemonType,
        #           },
        #         },
        #       },
        #     },
        #   },
        # },
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
