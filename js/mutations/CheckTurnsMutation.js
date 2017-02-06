import Relay from 'react-relay';

export default class CheckTurnsMutation extends Relay.Mutation {
  static fragments = {
    game: () => Relay.QL`
      fragment on Game {
        id,
        turnsRemaining,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{checkTurns}`;
  }
  // getCollisionKey() {
  //   return `check_${this.props.game.id}`;
  // }
  getFatQuery() {
    return Relay.QL`
      fragment on CheckTurnsPayload @relay(pattern: true) {
        game {
          turnsRemaining,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        game: this.props.game.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.game.id,
    };
  }
  getOptimisticResponse() {
    return {
      game: {
        turnsRemaining: this.props.game.turnsRemaining - 1,
      },
    };
  }
}
