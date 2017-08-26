import React from 'react';
import Relay from 'react-relay';
import TypedTransition from '../../scripts/TypedTransition';
import {
  Row,
  Col,
  Nav,
  NavItem,
  Panel,
  Button,
  Glyphicon,
  Table,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('----------numbers: ', this.props.game.tiles.edges);
    return (
      <Row className="text-center">
        <Col md={12} sm={12} lg={12} xs={12} className="text-center">
          <Panel header="Cryptogram">
            <Table className="crypto-table" striped bordered condensed>
              <tbody>
                <tr>
                  <td colSpan="16">
                    Each number represents a different letter. When you have
                    solved the Cryptogram, <b>the name of an epic Drama and
                    Fantasy TV show that has been airing on HBO since 2011</b>
                    will appear in the marked squares.
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    Lacking in knowledge or
                    training; unlearned.
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>1</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="I" />
                    </FormGroup>
                  </td>
                  <td className="tile marked">
                    <FormGroup>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="G" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>3</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="N" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>4</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="O" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>5</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="R" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>6</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="A" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>3</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="N" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>7</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="T" />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    An act of killing a lot of people.
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>2</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="M" />
                    </FormGroup>
                  </td>
                  <td className="tile marked">
                    <FormGroup>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="A" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>8</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="S" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>8</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="S" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>6</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="A" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>9</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="C" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>5</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="R" />
                    </FormGroup>
                  </td>
                  <td className="tile">
                    <FormGroup>
                      <ControlLabel>10</ControlLabel>
                      <FormControl type="text" />
                      <FormControl type="hidden" value="E" />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A strong wish to achieve something.
                  </td>
                  <td>A</td>
                  <td className="marked">M</td>
                  <td>B</td>
                  <td>I</td>
                  <td>T</td>
                  <td>I</td>
                  <td>O</td>
                  <td>N</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    The act of going against loyalty.
                  </td>
                  <td>B</td>
                  <td className="marked">E</td>
                  <td>T</td>
                  <td>R</td>
                  <td>A</td>
                  <td>Y</td>
                  <td>A</td>
                  <td>L</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A person who watches what happens but has no active part
                    in it.
                  </td>
                  <td className="marked">O</td>
                  <td>B</td>
                  <td>S</td>
                  <td>E</td>
                  <td>R</td>
                  <td>V</td>
                  <td>E</td>
                  <td>R</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">Frightening.</td>
                  <td className="marked">F</td>
                  <td>E</td>
                  <td>A</td>
                  <td>R</td>
                  <td>S</td>
                  <td>O</td>
                  <td>M</td>
                  <td>E</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A detailed plan for achieving success in situations such as
                    war, politics, business, industry, or sport.
                  </td>
                  <td>S</td>
                  <td className="marked">T</td>
                  <td>R</td>
                  <td>A</td>
                  <td>T</td>
                  <td>E</td>
                  <td>G</td>
                  <td>Y</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    The crime of stealing things.
                  </td>
                  <td>T</td>
                  <td className="marked">H</td>
                  <td>I</td>
                  <td>E</td>
                  <td>V</td>
                  <td>E</td>
                  <td>R</td>
                  <td>Y</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A royal title for a female heir to the throne.
                  </td>
                  <td>P</td>
                  <td className="marked">R</td>
                  <td>I</td>
                  <td>N</td>
                  <td>C</td>
                  <td>E</td>
                  <td>S</td>
                  <td>S</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    To have control over a place or person.
                  </td>
                  <td>D</td>
                  <td className="marked">O</td>
                  <td>M</td>
                  <td>I</td>
                  <td>N</td>
                  <td>A</td>
                  <td>T</td>
                  <td>E</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A flat, usually square or rectangular, paper container
                    for a letter.
                  </td>
                  <td>E</td>
                  <td className="marked">N</td>
                  <td>V</td>
                  <td>E</td>
                  <td>L</td>
                  <td>O</td>
                  <td>P</td>
                  <td>E</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    A set of formal acts, often fixed and traditional,
                    performed on important social or religious occasions.
                  </td>
                  <td>C</td>
                  <td className="marked">E</td>
                  <td>R</td>
                  <td>E</td>
                  <td>M</td>
                  <td>O</td>
                  <td>N</td>
                  <td>Y</td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-left">
                    Accompanied by someone to a specific place.
                  </td>
                  <td>E</td>
                  <td className="marked">S</td>
                  <td>C</td>
                  <td>O</td>
                  <td>R</td>
                  <td>T</td>
                  <td>E</td>
                  <td>D</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
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
