import Relay from 'react-relay';

export default class EditTokenMutation extends Relay.Mutation {
  static fragments = {
    game: () => Relay.QL`
      fragment on Game {
        id,
        turnsRemaining,
      }
    `,
    token: () => Relay.QL`
      fragment on Token {
        id,
        name,
        attribute,
        amount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{editToken}`;
  }
  // getCollisionKey() {
  //   return `check_${this.props.game.id}`;
  // }
  getFatQuery() {
    return Relay.QL`
      fragment on EditTokenPayload @relay(pattern: true) {
        token {
          name,
          attribute,
          amount,
        },
        game {
          turnsRemaining,
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
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        token: this.props.token.id,
        game: this.props.game.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.token.id,
      name: this.props.token.name,
      attribute: this.props.token.attribute,
      amount: this.props.token.amount + 1,
    };
  }
  getOptimisticResponse() {
    return {
      game: {
        turnsRemaining: this.props.game.turnsRemaining - 1,
      },
      token: {
        amount: this.props.token.amount + 1,
      },
    };
  }
}
