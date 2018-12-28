import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AddRaidForm from '../components/raids/AddRaidForm';
import raidReducer from '../reducers/RaidReducer';

const store = createStore(raidReducer);

export default class AddRaidScreen extends React.Component {
  static navigationOptions = {
    title: 'Add a new Raid',
  };

  render() {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10, background: '#FFF' }}>
          <AddRaidForm navigation={this.props.navigation} />
        </View>
      </Provider>
    );
  }
}
