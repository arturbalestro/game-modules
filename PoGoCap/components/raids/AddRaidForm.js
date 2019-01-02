import React, { Component } from 'react';
import { Text, TextInput, View, Picker, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRaid } from '../../actions/RaidActions';
import raidStyles from '../../styles/raids';

class AddRaidForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    raidBoss: '',
    raidLvl: '1',
    gym: '',
    openingTime: '',
    groups: []
  }

  submitRaid() {
    const { raidBoss, raidLvl, gym, openingTime, groups } = this.state;
    
    const newRaid = {
      raidBoss,
      raidLvl,
      gym,
      openingTime,
      groups
    }

    const addRaidsResult = this.props.addRaid(newRaid);
    this.props.navigation.navigate('Home', addRaidsResult);
  }

  render() {
    return (
      <View style={raidStyles.raidFormContainer}>
        <TextInput
          style={raidStyles.textField}
          placeholder="Raid Boss"
          placeholderTextColor="#666"
          defaultValue={this.props.raids.raidBoss}
          onChangeText={(raidBoss) => this.setState({raidBoss})}
        />

        <Text style={raidStyles.label}>Raid Level</Text>
        <Picker
          selectedValue={this.props.raids.raidLvl !== undefined ? this.props.raids.raidLvl : this.state.raidLvl}
          style={raidStyles.dropdown}
          onValueChange={(itemValue, itemIndex) => this.setState({raidLvl: itemValue})}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="EX" value="EX" />
        </Picker>

        <TextInput
          style={raidStyles.textField}
          placeholder="Gym"
          placeholderTextColor="#666"
          defaultValue={this.props.raids.gym}
          onChangeText={(gym) => this.setState({gym})}
        />

        <TextInput
          style={raidStyles.textField}
          placeholder="Opening Time"
          placeholderTextColor="#666"
          defaultValue={this.props.raids.openingTime}
          onChangeText={(openingTime) => this.setState({openingTime})}
        />

        <View style={raidStyles.buttonContainer}>
          <TouchableHighlight
            style={raidStyles.button}
            onPress={() => this.submitRaid()}
          >
            <Text style={raidStyles.buttonText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={raidStyles.button}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={raidStyles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { raids } = state
  return { raids }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRaid,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddRaidForm);