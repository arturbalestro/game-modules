import React from 'react';
import Relay from 'react-relay';
import { Row, Col, Image, Button, Glyphicon, Label, Nav, NavItem } from 'react-bootstrap';
import TypedTransition from '../../scripts/TypedTransition';
import * as app from './App';
import TokenItem from './TokenItem';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';

let pokemonUnlocked = false;

export class TokenList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonUnlocked: false,
      menuDisplay: 'none',
      sortDisabled: true,
      tokens: this.props.tokens || []
    };

    this.backToGame = this.backToGame.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.renderHeaderMenu = this.renderHeaderMenu.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate() {

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

  handleSelect = (event) => {
    console.log('####sorting...', event, this.props.game);

    const tokenList = this.props.game.tokens;
    console.log('####tokenlist', tokenList);

      const sortedByObtained = tokenList.edges.filter((token) => {
        console.log('###token', token);
        return token.node.amount > 0   
      })
      console.log('####sortedByObtained', sortedByObtained);
      this.setState({ tokens: sortedByObtained });
    
  }

  renderHeaderMenu = () => {
    console.log('###header menu', this.state.menuDisplay);
    this.setState({ menuDisplay: 'none' ? 'block' : 'none' });

    const tokenList = this.props.game.tokens;
    console.log('####tokenlist', tokenList);

    if(tokenList.length > 0) {
      this.setState({ sortDisabled: false });
    }
  }

  render() {
    const tokens = this.state.tokens.length > 0 ? this.state.tokens : this.props.game.tokens;
    const pokemonList = this.getAllPokemon("Red");

    console.log('####tokens!!!', tokens, this.props.game.tokens, this.state.tokens);

    return (
      <Row className="token-list transition-item">
        <Col md={3} sm={3} lg={3} xs={2} className="text-center">
          <Button onClick={this.backToGame} className="pull-left">
            <Glyphicon glyph="menu-left" />
          </Button>
        </Col>
        <Col md={6} sm={6} lg={6} xs={4} className="text-center no-padding">
          <h2 className="text-center">Tokens</h2>
        </Col>
        <Col md={3} sm={3} lg={3} xs={2} className="token-nav text-center">
          <Button onClick={this.renderHeaderMenu} className="pull-right">
            <Glyphicon glyph="menu-hamburger" />
          </Button>
          <Col md={12} sm={12} lg={12} xs={10}>
            <Nav className="sort-nav" bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect} style={{ display: this.state.menuDisplay }}>
              <NavItem eventKey={1}>
                Sort by Name
              </NavItem>
              <NavItem eventKey={2}>
                Sort by Type
              </NavItem>
              <NavItem eventKey={3}>
                Sort by Obtained
              </NavItem>
            </Nav>
          </Col>
        </Col>
        <TokenItem game={this.props.game} tokens={tokens} pokemonList={pokemonList} />
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
        ${TokenItem.getFragment('game')},
        ${AddTokenMutation.getFragment('game')},
        ${EditTokenMutation.getFragment('game')},
      }
    `,
  },
});
