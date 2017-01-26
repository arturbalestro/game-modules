import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image, Button, Glyphicon } from 'react-bootstrap';
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';

export class TokenList extends React.Component {
  constructor(props) {
    super(props);

    this.backToGame = this.backToGame.bind(this);
  }

  backToGame() {
    TypedTransition.from(this).to(app);
  }

  render() {
    const trainers = this.props.game.trainers.edges;
    const wildGroup = trainers.filter(function(trainer) {
      return trainer.node.name === "Red";
    });
    const pokemonList = wildGroup[0].node.pokemons.edges;

    return (
      <Row className="token-list transition-item">
        <Col md={12}>
          <h3>Current tokens you have:</h3>
          <ul className="token-menu text-right">
            <li>
              <Button onClick={this.backToGame}>
                <Glyphicon glyph="menu-left" />
              </Button>
            </li>
          </ul>
        </Col>
        {this.props.game.tokens.edges.map(function(token, index) {
          const pokemon = pokemonList.filter((pokemon) => pokemon.node.name === token.node.name );
          return (
            <Col md={2} sm={1} lg={2} key={token.node.id} className="text-center">
              <div className={"token type-"+token.node.attribute}>
                <Image src={pokemon[0].node.image} />
              </div>
              <p className="text-center">{token.node.name} - {token.node.amount}</p>
            </Col>
          )}
        )}
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
              attribute
              amount
            }
          }
        }
      }
    `,
  },
});
