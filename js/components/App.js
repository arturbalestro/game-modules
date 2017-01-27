import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';
import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Row, Col, Nav, NavItem, Panel, Button, Glyphicon } from 'react-bootstrap';
import Tile from './Tile';
import TokenList from './TokenList';
import Stage from './Stage';
import * as stage from './Stage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey, e) {
    TypedTransition.from(this).with({ stage: selectedKey }).to(stage);
  }

  render() {
    return (
      <Row className="text-center">
        <h1>Select the stage:</h1>
        <Nav className="stage-menu" bsStyle="pills" stacked onSelect={this.handleSelect}>
          {/*Note: Add verification to prevent pairs to be found near each other */}
          <NavItem eventKey={1}>
            <Glyphicon glyph="flash" />
            <p>Power Plant</p>
          </NavItem>
          <NavItem eventKey={2}>
            <Glyphicon glyph="tree-deciduous" />
            <p>Viridian Forest</p>
          </NavItem>
          <NavItem eventKey={3}>
            <Glyphicon glyph="fire" />
            <p>Cinnabar Island</p>
          </NavItem>
          <NavItem eventKey={4}>
            <Glyphicon glyph="tint" />
            <p>Seafoam Islands</p>
          </NavItem>
          <NavItem eventKey={5}>
            <Glyphicon glyph="certificate" />
            <p>Rock Tunnel</p>
          </NavItem>
          <NavItem eventKey={6}>
            <Glyphicon glyph="leaf" />
            <p>Safari Zone</p>
          </NavItem>
          <NavItem eventKey={7}>
            <Glyphicon glyph="star-empty" />
            <p>Mt. Moon</p>
          </NavItem>
          <NavItem eventKey={8}>
            <Glyphicon glyph="download-alt" />
            <p>Underground Path</p>
          </NavItem>
          <NavItem eventKey={9}>
            <Glyphicon glyph="tower" />
            <p>Lavender Tower</p>
          </NavItem>
          <NavItem eventKey={10}>
            <Glyphicon glyph="road" />
            <p>Victory Road</p>
          </NavItem>
        </Nav>
      </Row>
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
        ${Stage.getFragment('game')},
      }
    `,
  },
});
