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
    this.showBack = this.showBack.bind(this, this.props.spot);
    this.showFront = this.showFront.bind(this, this.props.spot);
  }

  showBack(tile, e) {
    console.log('showBack', tile, e);

    const activeTiles = this.props.selectTile(tile, e);
    console.log('#Tile render: activeTiles', activeTiles);
    if(activeTiles != undefined && activeTiles.length > 1) {
      const isMatch = this.props.checkPair(activeTiles, this.props.spot);
      console.log('is it a match?', isMatch);

      if(!isMatch) {
        this.setState({
          isFlipped: false
        });
      }
    }

    this.setState({
      isFlipped: true
    });
  }

  showFront(tile, e) {
    console.log('showFront', tile, e);
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
      // <FlipCard
      //   disabled={true}
      //   flipped={this.state.isFlipped}
      //   // onClick={this.props.selectTile.bind(this, tile)}
      // >
      //   {/* The first child is used as the front of the card */}
      //   <div
      //     className="poketile"
      //     key={tile.id}
      //     id={tile.pokemon.name}
      //     onClick={this.props.selectTile.bind(this, tile)}
      //   >
      //     <Image
      //       className="pokebg"
      //       id={tile.pokemon.name}
      //       src="img/tile-bg.jpg"
      //       onClick={this.showBack}
      //     />
      //   </div>
      //   {/* The second child is used as the back of the card */}
      //   <div
      //     className="poketile"
      //     key={tile.id}
      //     id={tile.pokemon.name}
      //     onClick={this.props.selectTile.bind(this, tile)}
      //   >
      //     <Image
      //       className="pokeimg"
      //       id={tile.pokemon.name}
      //       src={tile.pokemon.image}
      //       alt={tile.pokemon.name}
      //       height="120"
      //       onClick={this.showFront}
      //     />
      //   </div>
      // </FlipCard>
    )
  }
}

Tile.propTypes = {
  selectTile: React.PropTypes.func,
  getCurrentTile: React.PropTypes.func,
};
