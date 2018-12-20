import React from 'react';
import { View } from 'react-native';

import RaidList from '../components/raids/RaidList';

export default class RaidsScreen extends React.Component {
  static navigationOptions = {
    title: 'Raids',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <View>
            <RaidList />
        </View>
    )
  }
}
