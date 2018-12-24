import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import FriendList from '../components/friends/FriendList';
import friendReducer from '../reducers/FriendReducer';

const store = createStore(friendReducer);

export default class FriendsScreen extends React.Component {
  static navigationOptions = {
    title: 'Friends',
  };

  render() {
    return (
      <Provider store={ store }>
        <View>
          <FriendList />
        </View>
      </Provider>
    )
  }
}
