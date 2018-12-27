import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  raidFormContainer: {
    padding: 10
  },
  textField: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    width: '100%',
    minHeight: 40,
    paddingLeft: 5
  },
  label: {
    padding: 10
  }
});

export default class AddRaidForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    text: ''
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
      <View style={styles.raidFormContainer}>
        <TextInput
          style={styles.textField}
          placeholder="Raid Boss"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={styles.label}>
          The raid level is {raidLvl}
        </Text>
      </View>
    );
  }
}

