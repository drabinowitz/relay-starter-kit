import 'babel/polyfill';
import CheckHidingSpotForTreasureMutation from
'../mutations/CheckHidingSpotForTreasureMutation';
import ResetGameMutation from
'../mutations/ResetGameMutation';
import HidingSpot from './HidingSpot'

class App extends React.Component {
  _handleHidingSpotClick(hidingSpot) {
    if (this.props.game.state !== 'PLAYING') {
      return;
    }
    Relay.Store.update(
      new CheckHidingSpotForTreasureMutation({
        game: this.props.game,
        hidingSpot,
      })
    );
  }
  renderGameBoard() {
    return this.props.game.hidingSpots.edges.map(edge => (
      <HidingSpot
        onClick={this._handleHidingSpotClick.bind(this, edge.node)}
        hidingSpot={edge.node}
      />
    ));
  }
  _handleResetGameClick() {
    Relay.Store.update(
      new ResetGameMutation({
        game: this.props.game,
      })
    );
  }
  renderResetButton() {
    return (
      <button
        onClick={this._handleResetGameClick.bind(this)}>
        reset?
      </button>
    );
  }
  render() {
    var headerText;
    if (this.props.relay.getPendingTransactions(this.props.game)) {
      headerText = '\u2026';
    } else if (this.props.game.state === 'WIN') {
      headerText = 'You win!';
    } else if (this.props.game.state === 'LOSE') {
      headerText = 'Game over!';
    } else {
      headerText = 'Find the treasure!';
    }
    return (
      <div>
        <h1>{headerText}</h1>
        {this.renderGameBoard()}
        {this.renderResetButton()}
        <p>Turns remaining: {this.props.game.turnsRemaining}</p>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        turnsRemaining,
        state,
        hidingSpots(first: 9) {
          edges {
            node {
              hasTreasure,
              id,
              ${CheckHidingSpotForTreasureMutation.getFragment('hidingSpot')},
              ${HidingSpot.getFragment('hidingSpot')},
            }
          }
        },
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
        ${ResetGameMutation.getFragment('game')},
      }
    `,
  },
});
