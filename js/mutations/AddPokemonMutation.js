import Relay from 'react-relay';

export default class AddPokemonMutation extends Relay.Mutation {
  // static fragments = {
  //   pokemon: () => Relay.QL`
  //     fragment on Pokemon {
  //       id
  //       unlocked
  //     }
  //   `,
  // };
  getMutation() {
    return Relay.QL`mutation{addPokemon}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddPokemonPayload @relay(pattern: true) {
        game {
          turnsRemaining,
          trainers(first: 10000) {
            edges {
              node {
                id
                name
                specialty
                weakness
                pokemons(first: 10000) {
                  edges {
                    node {
                      id
                      entryNumber
                      name
                      pokemonType
                      image
                      canEvolve
                      unlocked
                      species
                    }
                  }
                }
              }
            }
          }
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        // pokemon: this.props.pokemon.id,
        // trainer: this.props.trainer.id,
        game: this.props.game.id,
      },
    }];
  }
  getVariables() {
    return {
      trainerId: this.props.trainer.id,
      entryNumber: this.props.pokemon.entryNumber,
      unlocked: this.props.pokemon.unlocked,
    };
  }
  getOptimisticResponse() {
    return {
      game: {
        id: this.props.game.id,
      },
      trainer: {
        id: this.props.trainer.id,
      },
      pokemon: {
        entryNumber: this.props.pokemon.entryNumber,
        unlocked: this.props.pokemon.unlocked,
      }
    };
  }
}
