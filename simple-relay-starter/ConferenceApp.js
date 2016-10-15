/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, Button } from 'react-bootstrap';

// ConferenceApp is our top-level component
class ConferenceApp extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Pokémons of {this.props.trainer.name}</h2>
        {this.props.trainer.pokemons.edges.map(edge =>
          <Pokemon edge={edge} />
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
          <Button onClick={this.handleClick()}>Choose Pokémon</Button>
        </div>
      </div>
    )
  }
}

// We need to export a Relay container that wraps around
// the top-level ConferenceApp component
exports.Container = Relay.createContainer(ConferenceApp, {
  // We initially want to get the first user's conferences
  initialVariables: {
    trainerToShow: 4,
  },
  fragments: {
    // Results from this query will be placed on this.props for access in
    // our component
    trainer: () => Relay.QL`
      fragment on Trainer {
        name,
        pokemons(trainerToShow: $trainerToShow) {
          edges {
            node {
              id,
              name,
              image,
              pokemonType
            },
          },
        },
      }
    `,
  },
})

// The queries to be used by the root container
exports.queries = {
  name: 'ConferenceQueries',
  params: {},
  queries: {
    // user in this case matches the fragment in the container above
    trainer: () => Relay.QL`query { trainer }`,
  },
}
