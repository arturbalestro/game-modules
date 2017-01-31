import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image, Button, Glyphicon } from 'react-bootstrap';
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';
import PrizeModal from './PrizeModal';

let pokemonUnlocked = false;

export class TokenList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonUnlocked: false,
    };

    this.backToGame = this.backToGame.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.checkTokenAmount = this.checkTokenAmount.bind(this);
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

  checkTokenAmount(tokens) {
    const allPokemon = this.getAllPokemon("Red");
    const canUnlock = tokens.filter(function(token, index) {
      return token.node.amount >= 2;
    });
    const lastUnlockable = canUnlock.filter(function(token, index) {
      console.log(token.node.name, index, ' - ', (index+1) === canUnlock.length );
      return index + 1 === canUnlock.length;
    });
    console.log('lastUnlockable', lastUnlockable);
    const unlockablePokemon = allPokemon.filter(function(pokemon) {
      return pokemon.node.entryNumber === lastUnlockable[0].node.entryNumber + 1;
    });
    console.log('and the unlocked pokémon will be...', unlockablePokemon);
    return unlockablePokemon;
  }

  componentDidMount() {
    const tokens = this.props.game.tokens.edges;
    const unlockablePokemon = this.checkTokenAmount(tokens);
    console.log('unlockablePokemon', unlockablePokemon, unlockablePokemon.length);

    if(unlockablePokemon != undefined || unlockablePokemon.length > 0) {
      this.setState({ unlockablePokemon: unlockablePokemon[0] });
    }
  }

  render() {
    pokemonUnlocked = false;
    const pokemonList = this.getAllPokemon("Red");
    if(this.state.unlockablePokemon !== undefined) {
      pokemonUnlocked = true;
    }
    console.log('this.state.unlockablePokemon', this.state.unlockablePokemon);

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
        {pokemonList.map(function(pokemon, index) {
          //const pokemon = pokemonList.filter((pokemon) => pokemon.node.name === token.node.name );
          return (
            <Col md={2} sm={1} lg={2} key={pokemon.node.id} className="text-center">
              <div className={"token type-"+pokemon.node.attribute}>
                <Image src={pokemon.node.image} />
              </div>
              <p className="text-center">{pokemon.node.name}</p>
            </Col>
          )}
        )}

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
        {pokemonUnlocked &&
          <PrizeModal
            game={this.props.game}
            prize={this.state.unlockablePokemon !== undefined ? this.state.unlockablePokemon : []}
            showModal={true}
            restartGame={this.props.restartGame}
            pokemonUnlocked={true}
          />
        }
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
