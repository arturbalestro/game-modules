import React from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { addFriend } from '../../actions/FriendActions';

const styles = StyleSheet.create({
    friendContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        marginTop: 10
    },
    friendItem: {
        flex: 1,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        textAlignVertical: 'center',
        marginBottom: 10,
        padding: 10,
        minWidth: 150
    },
    boldText: {
        fontWeight: 'bold'
    },
    italicText: {
        fontStyle: 'italic'
    },
    marginBottom: {
        marginBottom: 10
    }
});

class FriendList extends React.Component {
    render() {
        return(
            <ScrollView>
                <View style={styles.friendContainer}>
                    {this.props.friends.current.length > 0 &&
                        <Text>Current Friends:</Text>
                    }
                    {
                        this.props.friends.current.map((friend, index) => (
                            <View key={index} style={styles.friendItem}>
                                <Text>INDEX: {index}</Text>
                                <Text style={styles.boldText}>{friend.username}</Text>
                                <Text style={styles.italicText}>"{friend.nickname}"</Text>
                                <Text>Level: {friend.level}</Text>
                                <Text>Caught Pokémon: {friend.caught}</Text>
                                <Text>Pokédex: {friend.pokedex}</Text>
                                <Text>Battles Won: {friend.battlesWon}</Text>
                                <Text style={styles.marginBottom}>Distance on Foot: {friend.walkingDistance}</Text>
                            </View>
                        ))
                    }
                    
                    {this.props.friends.possible.length > 0 &&
                        <Text>Possible Friends to Add:</Text>
                    }
                    {
                        this.props.friends.possible.map((friend, index) => (
                            <View key={index} style={styles.friendItem}>
                                <Text style={[styles.boldText, styles.marginBottom]}>{friend.username}</Text>
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