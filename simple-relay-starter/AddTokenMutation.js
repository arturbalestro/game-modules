import Relay from 'react-relay';

export default class AddTokenMutation extends Relay.Mutation {
  // fragments: {
  //   viewer: () => Relay.QL`
  //     fragment on User {
  //       id,
  //     }
  //   `,
  // }
  getMutation() {
    return Relay.QL`mutation{addTokenMutation}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTokenMutationPayload {
        user {
          id
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
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user,
      connectionName: 'tokens',
      edgeName: 'token',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': 'append',
      },
      // type: 'FIELDS_CHANGE',
      // fieldIDs: {
      //   user: this.props.user,
      // },
    }];
  }
  getVariables() {
    console.log('VARIABLES!', this.props);
    return {
      id: this.props.id,
      userId: this.props.userId,
      name: this.props.name,
      attribute: this.props.attribute,
      amount: this.props.amount,
    };
  }
  getOptimisticResponse() {
    console.log('getOptimisticResponse!', this.props);
    return {
      token: {
        id: this.props.id,
        userId: this.props.userId,
        name: this.props.name,
        attribute: this.props.attribute,
        amount: this.props.amount,
      },
      user: {
        id: this.props.userId,
      },
    };
  }
}

// export default class AddTokenMutation extends Relay.Mutation {
//   // we only need to request the id to perform this mutation
//   getMutation() {
//     return Relay.QL`mutation{addTokenMutation}`;
//   }
//   getFatQuery() {
//     return Relay.QL`
//       fragment on AddTokenMutationPayload {
//         user {
//           id,
//           name,
//           tokens(first: 10000) {
//             edges {
//               node {
//               	id
//                 name
//                 attribute
//                 amount
//               }
//             }
//           }
//         }
//       }
//     `;
//   }
//   getConfigs() {
//     return [{
//       type: 'FIELDS_CHANGE',
//       fieldIDs: {
//         user: this.props.user,
//       },
//     }];
//   }
//   getVariables() {
//     // there are two inputs to the mutation: the todo `id` and the new `text` name.
//     return {
//       id: this.props.token.id,
//       name: this.props.token.name,
//       /*attribute: this.props.token.pokemonType,
//       amount: this.props.token.amount,*/
//     };
//   }
//   getOptimisticResponse() {
//     // optionally spoof the server response
//     // same output as the above outputFields()
//     return {
//       token: {
//         id: this.props.token.id,
//         name: this.props.token.name,
//         /*attribute: this.props.token.pokemonType,
//         amount: this.props.token.amount,*/
//       },
//     };
//   }
// }
