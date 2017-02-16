import React from 'react';
import Relay from 'react-relay';
import FlipCard from 'react-flipcard';
import { Label, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import CheckTurnsMutation from '../mutations/CheckTurnsMutation';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnsRemaining: this.props.turnsRemaining,
      isFlipped: this.props.isFlipped,
    };

    this.checkPair = this.props.checkPair.bind(this);
    this.getCurrentTile = this.props.getCurrentTile.bind(this.props.spot, this);
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
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
      // <div
      //   className="poketile"
      //   key={tile.id}
      //   id={tile.pokemon.name}
      //   onClick={this.props.selectTile.bind(this, tile)}
      // >
      //   <Image
      //     className="pokeimg"
      //     src={tile.pokemon.image}
      //     alt={tile.pokemon.name}
      //     height="120"
      //   />
      // </div>
      // <div
      //   className="poketile"
      //   key={tile.id}
      //   id={tile.pokemon.name}
      //   onClick={this.props.selectTile.bind(this, tile)}
      // >
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
        >
          {/* The first child is used as the front of the card */}
          <div className="poketile" onClick={this.showBack}>
            <Image className="pokebg" src="img/tile-bg.jpg" onClick={this.showBack} />
          </div>
          {/* The second child is used as the back of the card */}
          <div
            className="poketile"
            key={tile.id}
            id={tile.pokemon.name}
            // onClick={this.props.selectTile.bind(this, tile)}
            onClick={this.showFront}
          >
            <Image
              className="pokeimg"
              src={tile.pokemon.image}
              alt={tile.pokemon.name}
              onClick={this.showFront}
              height="120"
            />
          </div>
        </FlipCard>
      // </div>
    )
  }
}

Tile.propTypes = {
  selectTile: React.PropTypes.func,
  getCurrentTile: React.PropTypes.func,
};
