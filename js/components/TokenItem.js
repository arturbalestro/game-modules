import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image, Button, Glyphicon, Label, Nav, NavItem } from 'react-bootstrap';
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';

export class TokenItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: this.props.tokens || []
    };
  }

  render() {
    const tokens = this.props.tokens;
    const pokemonList = this.props.pokemonList;

    console.log('####tokens!!!', tokens);

    return (
        <Col md={12} className="text-center pull-left">
            {pokemonList.map(function(pokemon, index) {
                const token = tokens.edges.filter((token) => token.node.name === pokemon.node.name );
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
    )
  }
}

TokenItem.contextTypes = TypedTransition.contextTypes();

export default Relay.createContainer(TokenItem, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        id
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
      }
    `,
  },
});
