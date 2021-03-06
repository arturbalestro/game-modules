import Relay from 'react-relay';

export default class RenameTrainerMutation extends Relay.Mutation {
  // we only need to request the id to perform this mutation
  /*static fragments = {
    trainer: () => Relay.QL`
      fragment on trainer {
        id,
        name,
      }
    `,
  };*/
  getMutation() {
    return Relay.QL`mutation{renameTrainer}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RenameTrainerPayload {
        user {
          name,
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
    // there are two inputs to the mutation: the trainer `id` and the new `text` name.
    return {
      id: this.props.user.id,
      name: this.props.user.name,
    };
  }
  getOptimisticResponse() {
    // optionally spoof the server response
    // same output as the above outputFields()
    return {
      trainer: {
        id: this.props.user.id,
        name: this.props.name,
      },
    };
  }
}
