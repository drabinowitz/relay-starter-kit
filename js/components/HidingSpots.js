import HidingSpot from './HidingSpot'

class HidingSpots extends React.Component {
  renderGameBoard() {
    return this.props.game.hidingSpots.edges.map(edge => (
      <HidingSpot
        game={this.props.game}
        hidingSpot={edge.node}
      />
    ));
  }

  _handleHidingSpotPageClick() {
    if (this.props.game.hidingSpots.pageInfo.hasNextPage) {
      this.props.relay.setVariables({
        hidingSpotCursor: this.props.game.hidingSpots.pageInfo.endCursor,
      });
    } else {
      this.props.relay.setVariables({
        hidingSpotCursor: null,
      });
    }
  }

  renderCursorButtons() {
    return (
      <div>
        <button
          onClick={this._handleHidingSpotPageClick.bind(this)}>
          Page
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderGameBoard()}
        {this.renderCursorButtons()}
      </div>
    );
  }
}

export default Relay.createContainer(HidingSpots, {
  initialVariables: {
    hidingSpotCursor: null
  },
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        hidingSpots(first: 3 after: $hidingSpotCursor) {
          edges {
            node {
              ${HidingSpot.getFragment('hidingSpot')},
            },
            cursor,
          },
          pageInfo {
            hasNextPage,
            endCursor,
          },
        },
        ${HidingSpot.getFragment('game')},
      }
    `,
  }
})
