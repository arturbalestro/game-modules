import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Nav, NavItem } from 'react-bootstrap';
import Tile from './Tile';
import TokenList from './TokenList';
import * as powerPlant from './stages/PowerPlant';
import * as viridianForest from './stages/ViridianForest';
import * as cinnabarIsland from './stages/CinnabarIsland';
import * as seafoamIslands from './stages/SeafoamIslands';
import * as rockTunnel from './stages/RockTunnel';
import * as safariZone from './stages/SafariZone';
import * as mtMoon from './stages/MtMoon';
import * as undergroundPath from './stages/UndergroundPath';
import * as lavenderTower from './stages/LavenderTower';
import * as victoryRoad from './stages/VictoryRoad';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    switch(selectedKey) {
      case 1:
        TypedTransition.from(this).to(powerPlant);
      break;

      case 2:
        TypedTransition.from(this).to(viridianForest);
      break;

      case 3:
        TypedTransition.from(this).to(cinnabarIsland);
      break;

      case 4:
        TypedTransition.from(this).to(seafoamIslands);
      break;

      case 5:
        TypedTransition.from(this).to(rockTunnel);
      break;

      case 6:
        TypedTransition.from(this).to(safariZone);
      break;

      case 7:
        TypedTransition.from(this).to(mtMoon);
      break;

      case 8:
        TypedTransition.from(this).to(undergroundPath);
      break;

      case 9:
        TypedTransition.from(this).to(lavenderTower);
      break;

      case 10:
        TypedTransition.from(this).to(victoryRoad);
      break;
    }
  }

  render() {
    return (
      <div>
        <h1>Select the stage:</h1>
        <Nav bsStyle="pills" stacked onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Power Plant</NavItem>
          <NavItem eventKey={2}>Viridian Forest</NavItem>
          <NavItem eventKey={3}>Cinnabar Island</NavItem>
          <NavItem eventKey={4}>Seafoam Islands</NavItem>
          <NavItem eventKey={5}>Rock Tunnel</NavItem>
          <NavItem eventKey={6}>Safari Zone</NavItem>
          <NavItem eventKey={7}>Mt. Moon</NavItem>
          <NavItem eventKey={8}>Underground Path</NavItem>
          <NavItem eventKey={9}>Lavender Tower</NavItem>
          <NavItem eventKey={10}>Victory Road</NavItem>
        </Nav>
      </div>
    );
  }
}

export function path() {
  return '/game';
}

App.contextTypes = TypedTransition.contextTypes();

export default Relay.createContainer(App, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        id,
        turnsRemaining,
        hidingSpots(first: 9) {
          edges {
            node {
              hasBeenChecked,
              hasTreasure,
              id,
              ${CheckHidingSpotForTreasureMutation.getFragment('hidingSpot')},
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
        ${AddTokenMutation.getFragment('game')},
        ${EditTokenMutation.getFragment('game')},
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
      }
    `,
  },
});
