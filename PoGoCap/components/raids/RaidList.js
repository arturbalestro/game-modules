import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import raidStyles from '../../styles/raids';

class RaidList extends React.Component {

  handleJoinGroup() {
    alert('Joining feature is inactive now!');
  }

  handleAddRaid() {
    this.props.navigation.navigate("AddRaid");
  }

  render() {
    return(
      <ScrollView>
        <Text style={raidStyles.raidTitle}>Upcoming raids:</Text>
    
        <View style={raidStyles.raidContainer}>
            {this.props.raids.currentRaids.map((raid, index) => (
              <View key={raid+index} style={raidStyles.raidItem}>
                  <Text>
                      Raid lvl {raid.raidLvl}: <Text style={raidStyles.boldText}>{raid.raidBoss}</Text>
                  </Text>

                  <Text>
                      Pokéstop: <Text style={raidStyles.boldText}>{raid.gym}</Text>
                  </Text>

                  <Text>
                      Opens: <Text style={raidStyles.boldText}>{raid.openingTime}</Text>
                  </Text>

                  <View style={raidStyles.raidGroupList}>
                      <Text style={raidStyles.boldText}>Raid Groups:</Text>

                      {raid.groups.map((group, index) => (
                        <View key={group+index} style={raidStyles.raidGroup}>
                          <Text>
                              Battle: <Text style={raidStyles.boldText}>{group.battleTime}</Text>
                          </Text>
                          
                          <View style={raidStyles.raidGroupMembers}>
                              {group.members.map((member, index) => (
                                <Text key={member+index}>{member.name} - {member.team} - {member.level}</Text>
                              ))}
                          </View>

                          <Button onPress={() => this.handleJoinGroup()} title="Join this group" />
                        </View>
                      ))}
                  </View>
              </View>
            ))}

            <Button onPress={() => this.handleAddRaid()} title="Add a new Raid" />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { raids } = state
  return { raids }
};

export default connect(mapStateToProps)(RaidList);