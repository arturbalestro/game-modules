import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image, Button, Glyphicon, Label } from 'react-bootstrap';
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';
import PrizeModal from './PrizeModal';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';

let pokemonUnlocked = false;

export class TokenList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonUnlocked: false,
    };

    this.backToGame = this.backToGame.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
  }

  backToGame() {
    TypedTransition.from(this).to(app);
  }

  getAllPokemon(trainerFilter) {
    const trainers = this.props.game.trainers.edges;
    const fullGroup = trainers.filter(function(trainer) {
      return trainer.node.name === trainerFilter;
    });
    return fullGroup[0].node.pokemons.edges;
  }

  renderHeaderMenu() {
    console.log('###header menu');
    const nav = (
      <Nav bsStyle="pills" stacked activeKey={1} onSelect={handleSelect}>
        <NavItem eventKey={1} disabled>
          Sort by Name
        </NavItem>
        <NavItem eventKey={2} disabled>
          Sort by Type
        </NavItem>
        <NavItem eventKey={3} disabled>
          Sort by Obtained
        </NavItem>
      </Nav>
    );

    return nav;
  }

  render() {
    const tokens = this.props.game.tokens.edges;
    const pokemonList = this.getAllPokemon("Red");

    return (
      <Row className="token-list transition-item">
        <Col md={1} sm={1} lg={1} xs={2} className="text-center">
          <Button onClick={this.backToGame}>
            <Glyphicon glyph="menu-left" />
          </Button>
        </Col>
        <Col md={10} sm={10} lg={10} xs={8} className="text-center no-padding">
          <h2 className="text-center">Tokens</h2>
        </Col>
        <Col md={1} sm={1} lg={1} xs={2} className="text-center">
          <Button onClick={() => this.renderHeaderMenu}>
            <Glyphicon glyph="menu-hamburger" />
          </Button>
        </Col>
        <Col md={12} className="text-center pull-left">
          {pokemonList.map(function(pokemon, index) {
            const token = tokens.filter((token) => token.node.name === pokemon.node.name );
            if(token.length > 0) {
              return (
                <Col md={2} sm={1} lg={2} key={token[0].node.id} className="token-box text-center">
                  <Label className="token-amount">{token[0].node.amount}</Label>
                  <div className={"token type-"+token[0].node.attribute}>
                    <Image src={pokemon.node.image} />
                  </div>
                  <Label className="token-name text-center">{pokemon.node.name}</Label>
                </Col>
              )
            } else {
              return (
                <Col md={2} sm={1} lg={2} key={pokemon.node.id} className="token-box text-center inactive">
                  <div className="token">
                    <Image src={pokemon.node.image} />
                  </div>
                  <Label className="token-name text-center">{pokemon.node.name}</Label>
                </Col>
              )
            }
          })}
        </Col>
      </Row>
    )
  }
}

export function path() {
  return '/tokens';
}

TokenList.contextTypes = TypedTransition.contextTypes();

export default Relay.createContainer(TokenList, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        id
        turnsRemaining,
        hidingSpots(first: 9) {
          edges {
            node {
              hasBeenChecked,
              hasTreasure,
              id,
            }
          }
        },
        trainers(first: 10000) {
          edges {
            node {
              id
              name
              specialty
              weakness
              pokemons(first: 10000) {
                edges {
                  node {
                    id
                    entryNumber
                    name
                    pokemonType
                    image
                    canEvolve
                    unlocked
                    species
                  }
                }
              }
            }
          }
        }
        tokens(first: 10000) {
          edges {
            node {
              id
              name
              entryNumber
              attribute
              amount
            }
          }
        }
        ${AddTokenMutation.getFragment('game')},
        ${EditTokenMutation.getFragment('game')},
      }
    `,
  },
});
