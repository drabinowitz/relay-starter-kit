export default class ResetGameMutation extends Relay.Mutation {
  static fragments = {
    game: () => Relay.QL`
      fragment on Game {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{resetGame}`;
  }
  getCollisionKey() {
    return `check_reseting_game_${this.props.game.id}`;
  }
  getFatQuery() {
    return Relay.QL`fragment on ResetGamePayload {game}`;
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
    return {};
  }
};
