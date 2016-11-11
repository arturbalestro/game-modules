/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, Button } from 'react-bootstrap';
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
        <h2>Pokémons of {this.props.trainer.name}</h2>
        <Button onClick={this.handleClick.bind(this, 'Embar')}>Change the name of the trainer</Button>
        <br /><br />
        {this.props.user.trainers.edges.map(edge =>
          {/* <Trainer edge={edge} /> */}
          <h2>{edge.node.name}</h2>
          {edge.node.pokemons.edges.map(edge =>
            <Pokemon edge={edge} />
          )}
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
        <div className="panel panel-default" key={edge.node.id}>
          <div className="panel-heading">
            <h5><b>{edge.node.name}</b></h5>
          </div>
          <div className="panel-body text-center">
            <img src={edge.node.image} height="120" />
            <br /><br />
            <Label bsStyle="success">{edge.node.pokemonType}</Label>
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
    // trainerToShow: 4,
  },
  fragments: {
    // Results from this query will be placed on this.props for access in
    // our component
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        trainers(first: 10) {
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
                    pokemonType
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
