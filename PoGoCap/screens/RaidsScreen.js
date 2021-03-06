import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RaidList from '../components/raids/RaidList';
import raidReducer from '../reducers/RaidReducer';

const store = createStore(raidReducer);

export default class RaidsScreen extends React.Component {
  static navigationOptions = {
    title: 'Raids',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Provider store={ store }>
        <View>
            <RaidList navigation={this.props.navigation} />
        </View>
      </Provider>
    )
  }
}
