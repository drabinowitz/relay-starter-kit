import 'babel/polyfill';
import ResetGameMutation from
'../mutations/ResetGameMutation';
import HidingSpot from './HidingSpot'

class App extends React.Component {
  renderGameBoard() {
    return this.props.game.hidingSpots.edges.map(edge => (
      <HidingSpot
        game={this.props.game}
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
              ${HidingSpot.getFragment('hidingSpot')},
            }
          }
        },
        ${HidingSpot.getFragment('game')},
        ${ResetGameMutation.getFragment('game')},
      }
    `,
  },
});
