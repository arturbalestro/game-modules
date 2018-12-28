import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addFriend } from '../../actions/FriendActions';
import friendStyles from '../../styles/friends';

class FriendList extends React.Component {
    render() {
        return(
            <ScrollView>
                <View style={friendStyles.friendContainer}>
                    {this.props.friends.current.length > 0 &&
                        <Text>Current Friends:</Text>
                    }
                    {
                        this.props.friends.current.map((friend, index) => (
                            <View key={index} style={friendStyles.friendItem}>
                                <Text>INDEX: {index}</Text>
                                <Text style={friendStyles.boldText}>{friend.username}</Text>
                                <Text style={friendStyles.italicText}>"{friend.nickname}"</Text>
                                <Text style={friendStyles.boldText}>Team: {friend.team}</Text>
                                <Text>Level: {friend.level}</Text>
                                <Text>Caught Pokémon: {friend.caught}</Text>
                                <Text>Pokédex: {friend.pokedex}</Text>
                                <Text>Battles Won: {friend.battlesWon}</Text>
                                <Text style={friendStyles.marginBottom}>Distance on Foot: {friend.walkingDistance}</Text>
                            </View>
                        ))
                    }
                    
                    {this.props.friends.possible.length > 0 &&
                        <Text>Possible Friends to Add:</Text>
                    }
                    {
                        this.props.friends.possible.map((friend, index) => (
                            <View key={index} style={friendStyles.friendItem}>
                                <Text style={[friendStyles.boldText, friendStyles.marginBottom]}>{friend.username}</Text>
                                <Button title="Add Friend" onPress={() => this.props.addFriend(friend, index)} />
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    const { friends } = state
    return { friends }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addFriend,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);