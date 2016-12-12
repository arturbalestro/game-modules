import Relay from 'react-relay';

export default class AddTokenMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{addTokenMutation}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTokenMutationPayload {
        token,
        user {
          id
          tokens
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'Token',
      edgeName: 'token',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': null,
      },
    }];
  }
  getVariables() {
    console.log('VARIABLES!!!', this.props);
    return {
      id: this.props.id,
      userId: this.props.user.id,
      name: this.props.name,
      attribute: this.props.attribute,
      amount: this.props.amount,
    };
  }
  getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      token: {
        node: {
          id: this.props.id,
          userId: this.props.user.id,
          name: this.props.name,
          attribute: this.props.attribute,
          amount: this.props.amount,
        },
      },
      user: {
        id: this.props.user.id,
        //totalCount: this.props.viewer.totalCount + 1,
      },
    };
  }
}

AddTokenMutation.fragments = {
  user: () => Relay.QL`
    fragment on User {
      id
    }
  `,
  token: () => Relay.QL`
    fragment on Token {
      id
      name
      attribute
      amount
    }
  `,
};
