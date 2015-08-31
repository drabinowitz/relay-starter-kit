import HidingSpot from './HidingSpot'

class HidingSpots extends React.Component {
  static propTypes = {
    onPage: React.PropTypes.func
  }

  renderGameBoard() {
    return this.props.hidingSpots.edges.map(edge => (
      <HidingSpot
        game={this.props.game}
        hidingSpot={edge.node}
      />
    ));
  }

  _handleHidingSpotNextPageClick() {
    this.props.onPage({
      first: 3,
      afterHidingSpotCursor: this.props.hidingSpots.pageInfo.endCursor,
      last: null,
      beforeHidingSpotCursor: null,
    });
  }

  _handleHidingSpotPreviousPageClick() {
    this.props.onPage({
      first: null,
      afterHidingSpotCursor: null,
      last: 3,
      beforeHidingSpotCursor: this.props.hidingSpots.pageInfo.startCursor,
    });
  }

  renderCursorButtons() {
    return (
      <div>
        <button
          disabled={!this.props.hidingSpots.pageInfo.hasPreviousPage}
          onClick={this._handleHidingSpotPreviousPageClick.bind(this)}>
          backward
        </button>
        <button
          disabled={!this.props.hidingSpots.pageInfo.hasNextPage}
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
  fragments: {
    hidingSpots: () => Relay.QL`
      fragment on HidingSpotConnection {
        edges {
          node {
            ${HidingSpot.getFragment('hidingSpot')},
          },
        },
        pageInfo {
          hasNextPage,
          hasPreviousPage,
          endCursor,
          startCursor,
        },
      }
    `,
    game: () => Relay.QL`
      fragment on Game {
        ${HidingSpot.getFragment('game')},
      }
    `,
  }
})
