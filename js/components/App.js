import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import { Row, Col, Nav, NavItem, Panel, Button, Glyphicon, Table } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('----------numbers: ', this.props.game.tiles.edges);
    return (
      <Row className="text-center">
        <Col md={1} sm={1} lg={1} xs={2} className="text-center">
        <Table striped bordered condensed>
          <tbody>
            <tr>
              {this.props.game.tiles.edges.map(edge =>
                <td key={edge.node.id}>
                  {edge.node.value}
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        </Col>
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
        id
        tiles(first: 1000) {
          edges {
            node {
              id
              value
              hasBeenChecked
            }
          }
        }
        turnsRemaining
      }
    `,
  },
});
