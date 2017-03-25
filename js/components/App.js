import AddTokenMutation from '../mutations/AddTokenMutation';
import EditTokenMutation from '../mutations/EditTokenMutation';
import AddPokemonMutation from '../mutations/AddTokenMutation';
import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Row, Col, Nav, NavItem, Panel, Button, Glyphicon, Label } from 'react-bootstrap';
import Tile from './Tile';
import TokenList from './TokenList';
import * as tokenList from './TokenList';
import Stage from './Stage';
import * as stage from './Stage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectStage = this.handleSelectStage.bind(this);
    this.handleTokenLink = this.handleTokenLink.bind(this);
  }

  handleSelectStage(selectedKey, e) {
    TypedTransition.from(this).with({ stage: selectedKey }).to(stage);
  }

  handleTokenLink(selectedKey, e) {
    TypedTransition.from(this).to(tokenList);
  }

  render() {
    return (
      <div className="text-center">
        <Col md={12} sm={12} lg={12}>
          <Row>
            <Col md={12} sm={12} lg={12} className="mapblock land"></Col>
            <Col md={8} sm={8} lg={8} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-right no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>

            <Col md={8} sm={8} lg={8} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={3} sm={3} lg={3} className="mapblock land"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-bottom">
              <a className="stagelink">
                <Label className="stagename" bsStyle="primary">Victory Road</Label>
                <img src="img/pokestop.png" />
              </a>
            </Col>
            <Col md={3} sm={3} lg={3} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-right no-bottom">
              <a className="stagelink">
                <Label className="stagename" bsStyle="primary">Mt. Moon</Label>
                <img src="img/pokestop.png" />
              </a>
            </Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-border"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-bottom">
              <a className="stagelink">
                <Label className="stagename" bsStyle="primary">Power Plant</Label>
                <img src="img/pokestop.png" />
              </a>
            </Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-right no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={4} sm={4} lg={4} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom">
            </Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={4} sm={4} lg={4} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom">
              <a className="stagelink">
                <Label className="stagename" bsStyle="primary">Rock Tunnel</Label>
                <img src="img/pokestop.png" />
              </a>
            </Col>

            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-border"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top no-bottom"></Col>
            <Col md={4} sm={4} lg={4} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-right no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-border"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top no-bottom">
              <a className="stagelink">
                <Label className="stagename" bsStyle="primary">Lavender Tower</Label>
                <img src="img/pokestop.png" />
              </a>
            </Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-right no-top"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top no-bottom"></Col>

            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={3} sm={3} lg={3} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock water"></Col>
            <Col md={3} sm={3} lg={3} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>

            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-right no-top"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right no-bottom"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-left no-top"></Col>

            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock road no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock land"></Col>

            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={5} sm={5} lg={5} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-top no-bottom"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock water"></Col>

            <Col md={3} sm={3} lg={3} className="mapblock water"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock island no-top no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock island no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-left no-right"></Col>
            <Col md={1} sm={1} lg={1} className="mapblock seatrail no-left no-top"></Col>
            <Col md={2} sm={2} lg={2} className="mapblock water"></Col>

            <Col md={12} sm={12} lg={12} className="mapblock water"></Col>
          </Row>
        </Col>
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
        ${Stage.getFragment('game')},
      }
    `,
  },
});
