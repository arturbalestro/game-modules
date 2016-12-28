import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image } from 'react-bootstrap';

export default class TokenList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('props', this.props);
    // const pokemonList = this.props.game.trainers.edges.map(trainer => trainer.node.pokemons.edges);
    // console.log('pokemonList found: ', pokemonList);
    const pokemonList = this.props.pokemons;

    return (
      <Row className="token-list">
        <Col md={12}>
          <h3>Current tokens you have:</h3>
        </Col>
        {this.props.tokens.edges.map(function(token, index) {
          const pokemon = pokemonList.filter((pokemon) => pokemon.node.name === token.node.name );
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

export function path() {
  return '/tokens';
}

// export default Relay.createContainer(TokenList, {
//   fragments: {
//     game: () => Relay.QL`
//       fragment on Game {
//         turnsRemaining,
//         hidingSpots(first: 9) {
//           edges {
//             node {
//               hasBeenChecked,
//               hasTreasure,
//               id,
//             }
//           }
//         },
//         trainers(first: 10000) {
//           edges {
//             node {
//               id
//               name
//               specialty
//               weakness
//               pokemons(first: 10000) {
//                 edges {
//                   node {
//                     id
//                     entryNumber
//                     name
//                     pokemonType
//                     image
//                     species
//                   }
//                 }
//               }
//             }
//           }
//         }
//         tokens(first: 10000) {
//           edges {
//             node {
//               id
//               name
//               attribute
//               amount
//             }
//           }
//         }
//       }
//     `,
//   },
// });
