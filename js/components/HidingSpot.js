class HidingSpot extends React.Component {
  _getHidingSpotStyle(hidingSpot) {
    var color;
    if (this.props.relay.hasOptimisticUpdate(hidingSpot)) {
      color = 'lightGrey';
    } else if (hidingSpot.hasBeenChecked) {
      if (hidingSpot.hasTreasure) {
        color = 'green';
      } else {
        color = 'red';
      }
    } else {
      color = 'black';
    }
    return {
      backgroundColor: color,
      cursor: 'pointer',
      display: 'inline-block',
      height: 100,
      marginRight: 10,
      width: 100,
    };
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this._getHidingSpotStyle(this.props.hidingSpot)}
        />
    );
  }
}

export default Relay.createContainer(HidingSpot, {
  fragments: {
    hidingSpot: () => Relay.QL`
      fragment on HidingSpot {
        hasBeenChecked,
        hasTreasure,
      }
    `,
  }
});
