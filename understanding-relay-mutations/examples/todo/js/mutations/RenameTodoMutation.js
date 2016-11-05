/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Relay from 'react-relay';

export default class RenameTodoMutation extends Relay.Mutation {
  // we only need to request the id to perform this mutation
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{renameTodo}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RenameTodoPayload {
        todo {
          text,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
      },
    }];
  }
  getVariables() {
    // there are two inputs to the mutation: the todo `id` and the new `text` name.
    return {
      id: this.props.todo.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    // optionally spoof the server response
    // same output as the above outputFields()
    return {
      todo: {
        id: this.props.todo.id,
        text: this.props.text,
      },
    };
  }
}
