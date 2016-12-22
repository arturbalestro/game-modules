import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image } from 'react-bootstrap';

export default class TokenList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pokemonList = this.props.pokemons;

    return (
      <Row className="token-list">
        <Col md={12}>
          <h3>Current tokens you have:</h3>
        </Col>
        {this.props.tokens.edges.map(function(token, index) {
          const pokemon = pokemonList.edges.filter((pokemon) => pokemon.node.name === token.node.name );
          return (
            <Col md={2} key={token.node.id} className="text-center">
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
