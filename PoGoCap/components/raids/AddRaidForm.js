import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class AddRaidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {

    let raidLvl = null;

    switch(this.state.text) {
      case 'Heatran':
        raidLvl = 5;
      break;

      case 'Walrein':
        raidLvl = 4;
      break;

      case 'Jynx':
      case 'Piloswine':
        raidLvl = 3;
      break;
    }

    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Raid Boss"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10}}>
          The raid level is {raidLvl}
        </Text>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => AddRaidForm);
