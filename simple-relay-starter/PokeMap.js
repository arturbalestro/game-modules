/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')
import { Label, Button } from 'react-bootstrap';
import RenameTrainerMutation from './RenameTrainerMutation';

class PokeMap extends React.Component {
  randomNumber(x) {
    return Math.floor((Math.random() * x) + 1);
  }

  render() {
  	const pokemons = this.props.trainer.pokemons.edges;
  	const availablePokemon = pokemons.length;
  	console.log("We have "+availablePokemon+" Pokémon available");
  	const randomPokemon = this.randomNumber(availablePokemon);
  	console.log(randomPokemon+" was picked up");
  	console.log('-----', pokemons.indexOf(randomPokemon));
    return (
      <div className="container">
        <h2>Welcome, {this.props.trainer.name}!</h2>
        <p>Choose your Starter to begin.</p>
        <br /><br />
        {this.props.trainer.pokemons.edges.map(edge =>
		    	<Pokemon edge={edge} randomPokemon={randomPokemon} />
        )}
      </div>
    )
  }
}

class Pokemon extends React.Component {

  handleClick(e) {
    console.log("click value: ", e.target.value);
  }

  render() {
    // We get the conference edges passed in from the top-level container
    // The edges have data like name and id on them
    var edge = this.props.edge;
    const pokemonExists = this.props.randomPokemon == edge.node.entryNumber;
		return (
		  <div>
		    {pokemonExists &&
			    <div className="panel panel-default text-center" bsStyle="text-center" key={edge.node.id}>
			      <div className="panel-heading">
			        <h5><b>#{edge.node.entryNumber} {edge.node.name}</b></h5>
			      </div>
			      <div className="panel-body text-center">
			        <img src={edge.node.image} height="120" />
			        <br /><br />
			        <Label bsStyle="success">{edge.node.pokemonType}</Label>
			      </div>
			      <Button onClick={this.handleClick.bind(this)} value={edge.node.entryNumber}>Catch it!</Button>
			    </div>
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
    trainerToShow: 5,
  },
  fragments: {
    // Results from this query will be placed on this.props for access in
    // our component
    trainer: () => Relay.QL`
      fragment on Trainer {
        id,
        name,
        pokemons(trainerToShow: $trainerToShow) {
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
    trainer: () => Relay.QL`query { trainer }`,
  },
}
