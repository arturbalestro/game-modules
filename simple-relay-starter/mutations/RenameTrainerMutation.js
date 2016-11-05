import Relay from 'react-relay';

export default class RenameTrainerMutation extends Relay.Mutation {
  // we only need to request the id to perform this mutation
  fragments: {
    trainer: () => Relay.QL`
      fragment on trainer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{renameTrainer}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RenameTrainerPayload {
        trainer {
          name,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        trainer: this.props.trainer.id,
      },
    }];
  }
  getVariables() {
    // there are two inputs to the mutation: the trainer `id` and the new `text` name.
    return {
      id: this.props.trainer.id,
      name: this.props.name,
    };
  }
  getOptimisticResponse() {
    // optionally spoof the server response
    // same output as the above outputFields()
    return {
      trainer: {
        id: this.props.trainer.id,
        name: this.props.name,
      },
    };
  }
}