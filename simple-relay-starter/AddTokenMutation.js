import Relay from 'react-relay';

export default class AddTokenMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{addTokenMutation}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTokenMutationPayload {
        user {
          id,
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
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    console.log('VARIABLES!!!', this.props);
    return {
      userId: this.props.user.id,
      name: this.props.name,
      attribute: this.props.attribute,
      amount: this.props.amount,
    };
  }
  // getOptimisticResponse() {
  //   return {
  //     // FIXME: totalCount gets updated optimistically, but this edge does not
  //     // get added until the server responds
  //     token: {
  //       id: this.props.token.id,
  //       name: this.props.token.name,
  //       attribute: this.props.token.attribute,
  //       amount: this.props.token.amount,
  //     },
  //     user: {
  //       id: this.props.user.id,
  //       //totalCount: this.props.viewer.totalCount + 1,
  //     },
  //   };
  // }
}

AddTokenMutation.fragments = {
  user: () => Relay.QL`
    fragment on User {
      id
      tokens
    }
  `,
};
