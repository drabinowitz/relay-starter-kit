import 'babel/polyfill';
import ResetGameMutation from
'../mutations/ResetGameMutation';
import HidingSpots from
'./HidingSpots'

class App extends React.Component {
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

  _handlePageChange(variables) {
    this.props.relay.setVariables(variables);
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
        {this.renderResetButton()}
        <HidingSpots
          game={this.props.game}
          hidingSpots={this.props.game.hidingSpots}
          onPage={this._handlePageChange.bind(this)}
          />
        <p>Turns remaining: {this.props.game.turnsRemaining}</p>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    first: 3,
  },
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        turnsRemaining,
        state,
        hidingSpots(first: $first) {
          ${HidingSpots.getFragment('hidingSpots')},
        },
        ${ResetGameMutation.getFragment('game')},
        ${HidingSpots.getFragment('game')},
      }
    `,
  },
});
