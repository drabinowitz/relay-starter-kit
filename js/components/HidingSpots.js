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

  _handleHidingSpotNextPageClick() {
    this.props.relay.setVariables({
      first: 3,
      afterHidingSpotCursor: this.props.game.hidingSpots.pageInfo.endCursor,
      last: null,
      beforeHidingSpotCursor: null,
    });
  }

  _handleHidingSpotPreviousPageClick() {
    this.props.relay.setVariables({
      first: null,
      afterHidingSpotCursor: null,
      last: 3,
      beforeHidingSpotCursor: this.props.game.hidingSpots.pageInfo.startCursor,
    });
  }

  renderCursorButtons() {
    return (
      <div>
        <button
          disabled={!this.props.game.hidingSpots.pageInfo.hasPreviousPage}
          onClick={this._handleHidingSpotPreviousPageClick.bind(this)}>
          backward
        </button>
        <button
          disabled={!this.props.game.hidingSpots.pageInfo.hasNextPage}
          onClick={this._handleHidingSpotNextPageClick.bind(this)}>
          forward
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
    first: 3,
    afterHidingSpotCursor: null,
    last: null,
    beforeHidingSpotCursor: null,
  },
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        hidingSpots(
          first: $first
          after: $afterHidingSpotCursor
          last:  $last
          before: $beforeHidingSpotCursor
        ) {
          edges {
            node {
              ${HidingSpot.getFragment('hidingSpot')},
            },
            cursor,
          },
          pageInfo {
            hasNextPage,
            hasPreviousPage,
            endCursor,
            startCursor,
          },
        },
        ${HidingSpot.getFragment('game')},
      }
    `,
  }
})
