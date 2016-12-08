import Relay from 'react-relay';

export default class AddTokenMutation extends Relay.Mutation {
  // we only need to request the id to perform this mutation
  // static fragments = {
  //   token: () => Relay.QL`
  //     fragment on token {
  //       id,
  //       name,
  //       attribute,
  //       amount,
  //     }
  //   `,
  // };
  getMutation() {
    return Relay.QL`mutation{AddToken}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTokenPayload {
        user {
          name,
          tokens(first: 10000) {
            edges {
              node {
              	id
                name
                attribute
                amount
              }
            }
          }
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    console.log('WHICH PROPS AM I SENDING?', this.props);
    // there are two inputs to the mutation: the trainer `id` and the new `text` name.
    return {
      id: this.props.token.id,
      name: this.props.token.name,
      attribute: this.props.token.pokemonType,
      amount: 1,
    };
  }
  getOptimisticResponse() {
    // optionally spoof the server response
    // same output as the above outputFields()
    return {
      token: {
        id: this.props.token.id,
        name: this.props.token.name,
        attribute: this.props.token.pokemonType,
        amount: 1,
      },
    };
  }
}
