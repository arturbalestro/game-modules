import React from 'react';
import Relay from 'react-relay';
import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import AddTokenMutation from '../mutations/AddTokenMutation';
import CheckTurnsMutation from '../mutations/CheckTurnsMutation';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileVisible: 'hidden',
      turnsRemaining: this.props.turnsRemaining,
    };

    this.checkPair = this.props.checkPair.bind(this);
    this.getCurrentTile = this.props.getCurrentTile.bind(this.props.spot, this);
  }

  _hasFoundTreasure() {
    return (
      this.props.hidingSpots.edges.some(edge => {
        return edge.node.hasTreasure
      })
    );
  }
  _isGameOver() {
    return !this.props.turnsRemaining || this._hasFoundTreasure();
  }

  render() {
    const tile = this.props.spot;

    return (
      <div
        className="poketile"
        key={tile.id}
        id={tile.pokemon.name}
        onClick={this.props.selectTile.bind(this, tile)}
      >
        <Image
          className="pokeimg"
          src={tile.pokemon.image}
          alt={tile.pokemon.name}
          height="120"
        />
      </div>
    )
  }
}

Tile.propTypes = {
  selectTile: React.PropTypes.func,
  getCurrentTile: React.PropTypes.func,
};
